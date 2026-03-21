# UI Generator Adapter

## Input Schema
```json
{
  "componentName": "string",
  "description": "string — what the component does",
  "props": { "propName": "TypeScript type" },
  "designSystem": "shadcn-ui",
  "outputPath": "frontend/components/features/[Name].tsx"
}
```

## Output
Raw TypeScript JSX string. Save to specified `outputPath`.
Validate against TypeScript compiler before saving.
