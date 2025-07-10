# CheckboxGroup Component

Accessible checkbox group component based on Radix UI with multiple style variants.

## Features

- ✅ Multiple selection support
- 🎨 Four style variants (default, card, list, button)
- 🔧 Configurable icon types and positions
- ♿ Full accessibility support
- 🎯 TypeScript support
- 🎪 Controlled and uncontrolled modes

## Installation

```bash
npm install @oversea/checkbox-group
# or
yarn add @oversea/checkbox-group
# or
pnpm add @oversea/checkbox-group
```

## Basic Usage

```tsx
import { CheckboxGroup, CheckboxGroupItem } from '@oversea/checkbox-group'

function App() {
  const [selectedValues, setSelectedValues] = useState<string[]>(['option1'])

  return (
    <CheckboxGroup value={selectedValues} onValueChange={setSelectedValues}>
      <CheckboxGroupItem value="option1" label="Option 1" />
      <CheckboxGroupItem value="option2" label="Option 2" />
      <CheckboxGroupItem value="option3" label="Option 3" />
    </CheckboxGroup>
  )
}
```

## Style Variants

### Default Style

```tsx
<CheckboxGroup variant="default" defaultValue={['option1']}>
  <CheckboxGroupItem value="option1" label="Option 1" />
  <CheckboxGroupItem value="option2" label="Option 2" />
</CheckboxGroup>
```

### Card Style

```tsx
<CheckboxGroup variant="card" defaultValue={['basic']}>
  <CheckboxGroupItem
    value="basic"
    label="Basic Plan"
    description="Perfect for personal use with basic features"
    icon={<IconComponent />}
  />
  <CheckboxGroupItem
    value="premium"
    label="Premium Plan"
    description="Great for teams with advanced features"
    icon={<IconComponent />}
  />
</CheckboxGroup>
```

### List Style

```tsx
<CheckboxGroup variant="list" defaultValue={['monthly']}>
  <CheckboxGroupItem value="monthly" label="Monthly Plan" price="$99/month" />
  <CheckboxGroupItem value="yearly" label="Yearly Plan" price="$999/year" />
</CheckboxGroup>
```

### Button Style

```tsx
<CheckboxGroup variant="button" defaultValue={['medium']}>
  <CheckboxGroupItem value="small" label="S" />
  <CheckboxGroupItem value="medium" label="M" />
  <CheckboxGroupItem value="large" label="L" />
</CheckboxGroup>
```

## API Reference

### CheckboxGroup

| Prop            | Type                                        | Default     | Description                                       |
| --------------- | ------------------------------------------- | ----------- | ------------------------------------------------- |
| `value`         | `string[]`                                  | -           | Current selected values array (controlled mode)   |
| `defaultValue`  | `string[]`                                  | `[]`        | Default selected values array (uncontrolled mode) |
| `onValueChange` | `(value: string[]) => void`                 | -           | Value change callback function                    |
| `variant`       | `'default' \| 'card' \| 'list' \| 'button'` | `'default'` | Component style variant                           |
| `iconType`      | `'default' \| 'checked'`                    | `'default'` | Icon type                                         |
| `iconPosition`  | `'start' \| 'end'`                          | `'start'`   | Icon position                                     |
| `className`     | `string`                                    | -           | Custom CSS class name                             |
| `children`      | `ReactNode`                                 | -           | Child components                                  |

### CheckboxGroupItem

| Prop          | Type        | Default | Description                                |
| ------------- | ----------- | ------- | ------------------------------------------ |
| `value`       | `string`    | -       | Option value (required)                    |
| `label`       | `string`    | -       | Option label text                          |
| `description` | `string`    | -       | Description text (available in card mode)  |
| `icon`        | `ReactNode` | -       | Icon element (available in card mode)      |
| `price`       | `string`    | -       | Price information (available in list mode) |
| `disabled`    | `boolean`   | `false` | Whether disabled                           |
| `className`   | `string`    | -       | Custom CSS class name                      |
| `children`    | `ReactNode` | -       | Child components                           |

## Multiple Selection Example

```tsx
function MultiSelectExample() {
  const [selected, setSelected] = useState<string[]>(['feature1', 'feature3'])

  return (
    <CheckboxGroup value={selected} onValueChange={setSelected} variant="card">
      <CheckboxGroupItem
        value="feature1"
        label="Feature A"
        description="Basic data analysis functionality"
      />
      <CheckboxGroupItem
        value="feature2"
        label="Feature B"
        description="Advanced report generation"
      />
      <CheckboxGroupItem
        value="feature3"
        label="Feature C"
        description="Automated workflow functionality"
      />
    </CheckboxGroup>
  )
}
```

## Accessibility

- Keyboard navigation support
- Screen reader support
- WAI-ARIA compliant
- Support for `aria-describedby` attribute

## Development

```bash
# Development mode
npm run dev

# Build
npm run build

# Publish
npm run build
```

## License

ISC
