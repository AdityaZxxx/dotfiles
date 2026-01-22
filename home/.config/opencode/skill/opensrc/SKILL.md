---
description: Fetch source code for npm packages and GitHub repos to give agents deeper context
---

# opensrc Skill

`opensrc` is a CLI tool that automates fetching package source code so agents can reference implementation details, not just types.

## Usage

### Fetching npm Packages

```bash
# Fetch source for a package (auto-detects version from lockfile)
opensrc <package_name>

# Fetch specific version
opensrc <package_name>@<version>

# Fetch multiple packages
opensrc react react-dom next
```

### Fetching GitHub Repositories

```bash
# Using owner/repo shorthand
opensrc owner/repo

# Using full URL
opensrc https://github.com/owner/repo

# Specific branch/tag
opensrc owner/repo@v1.0.0
```

## How it Works

1.  Clones source code into `opensrc/<package_name>/`.
2.  Updates `sources.json` index.
3.  Can automatically update `.gitignore`, `tsconfig.json`, and `AGENTS.md` to include the new source.

## Best Practices

- Use this skill when you need to understand the *internal implementation* of a library.
- Use `grep` or `glob` within the `opensrc/` directory to explore the fetched code.
- Combine with `index-knowledge` to generate documentation for the fetched code.
