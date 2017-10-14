# Blanc | Noir

## Extensions Ideas

blanc - root object

```typescript
registerCommands()
```

## Plugins

```typescript
interface Plugin {
    activate();
    deactivate();
}
```

```react
<PluginProvider>
    <AppContent />
</PluginProvider>
````

## Rx/Js for Eventing system