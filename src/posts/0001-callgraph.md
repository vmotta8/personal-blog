---
slug: extracting-code-snippets-from-call-graph-for-llm-context
title: Extracting code snippets from a call graph for LLM context
date: 2025-01-19
readTime: 8 min read
excerpt: When working with a complex function and trying to get an LLM to help refactor or better understand its flow, one of the challenges is ensuring that the entire call chain is captured.
tags:
  - go
  - llm
  - callgraph
thumbnail: 0001-callgraph-thumbnail.jpg
---

When working with a complex function and trying to get an LLM to help refactor or better understand its flow, one of the challenges is ensuring that **the entire call chain** is captured.

While most AI coding assistants can provide context based on the repository, when a function interacts with many others, some important parts of the call chain tend to be left out. This means I sometimes have to manually add those missing pieces or adjust my approach until the AI has all the necessary context.

The problem isn't just about **providing context**—it's about ensuring that **a specific part of the code has complete context**. I wanted a direct way to capture all function calls starting from a given function.

---

## What Was Built

I created a CLI in Go that generates a **callgraph** for a specific function. Instead of relying on a tool to extract context from the entire repository, this CLI maps **exactly** which functions are called from a specific entry point and organizes that context in a structured way.

For now, it only works with Go, as that's the language I use the most in my day-to-day work.

**GitHub Repository**
You can check out the project and try it yourself: [**Callgraph CLI**](https://github.com/vmotta8/callgraph-cli)

**Demo Video**
![Callgraph Demo](0001-callgraph-video.mp4)

---

## How It Works

### 1. Receiving Parameters

The CLI requires two pieces of information:

- **The file where the function is located** (path to the source code)
- **The name of the function to analyze**

---

### 2. Static Analysis and SSA Representation

Once the parameters are received, the tool performs **static analysis** on the code. This means it inspects the structure of the code without executing it, allowing it to understand **which function calls which** within the program.

To make this analysis more efficient, the code is converted into an intermediate form called **SSA (Static Single Assignment)**.

SSA is an intermediate representation used in compilers and analysis tools to better organize code. The key concept behind SSA is that **each variable is assigned exactly once**. Instead of overwriting variables, new versions of them are created as the program progresses.

For example, take this simple function:

```go
func sum(a, b int) int {
    x := a + b
    x = x * 2
    return x
}
```

In SSA form, it would look like this:

```go
func sum(a, b int) int {
    x1 := a + b
    x2 := x1 * 2
    return x2
}
```

Here, `x` is never overwritten. Instead, we create `x1` and `x2`, making it clear how values flow through the function. This helps in understanding the structure of the code and avoids ambiguities when tracking dependencies and function calls.

---

### 3. Building the Callgraph with CHA

With the code converted to SSA, the tool uses a library called **CHA (Call Hierarchy Analyzer)** to build the *callgraph*.

CHA processes the SSA version of the code and identifies **all functions called from the selected function**, either directly or indirectly. In the end, it produces a graph that represents exactly which functions participate in execution starting from that point.

This graph solves the problem of incomplete context because it captures **the entire call sequence**.

Below is a visual example of what a *callgraph* might look like for a function `run()` that calls other functions:

```
run()
├── DetectLanguage()
│    ├── hasGoMod()
│    ├── hasPackageJSON()
│    ├── hasRequirementsTxt()
│    └── hasCargoToml()
├── GetAnalyzer()
├── AnalyzeChain()
│    ├── buildCallGraph()
│    │    ├── findGoModRoot()
│    │    ├── findFunctionByName()
│    │    ├── convertCallGraphToCustomStructure()
│    │    └── buildCallGraphNode()
│    │         └── extractFunctionCode()
├── SaveAnalysisResult()
```

Each function here represents a node in the graph, showing the hierarchical relationship between function calls. If we were only looking at `run()`, we might miss critical details about functions executed in cascade. The *callgraph* provides a **complete picture** of what happens in execution.

---

### 4. Output of the Results

Once the callgraph is built, the CLI formats the result into a structured JSON output, which can be:

- **Displayed in the terminal**, for quick inspection
- **Copied to the clipboard**, making it easy to use with an LLM
- **Saved to a file**, for future analysis or integration with other tools
