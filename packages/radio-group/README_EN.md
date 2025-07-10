# RadioGroup Component

A Radio Group component based on Radix UI with multiple variants and data display capabilities.

## Features

- 🎯 **Multiple Variants**: Support for default, card, and compact visual styles
- 📊 **Data Display**: Support for percentage, currency, number and other data formats
- 🎨 **Flexible Sizing**: Provides sm, md, lg size options
- 🔄 **Layout Options**: Support for both horizontal and vertical orientations
- ♿ **Accessibility**: Complete ARIA attributes and keyboard navigation support
- ⌨️ **Keyboard Navigation**: Full keyboard support with arrow keys, space, tab, etc.
- 🎭 **State Management**: Support for hover, focus, disabled and other interaction states
- 🎨 **Theme Customization**: Built on Tailwind CSS for easy style customization
- 📦 **TypeScript**: Complete type definition support
- 🧩 **Flexible Composition**: Support for both controlled and uncontrolled modes

## Installation

```bash
npm install @oversea/radio-group
```

## Basic Usage

```tsx
import { RadioGroup, RadioGroupItem } from '@oversea/radio-group'

function BasicExample() {
  return (
    <RadioGroup defaultValue="option1">
      <RadioGroupItem value="option1" label="Option 1" />
      <RadioGroupItem value="option2" label="Option 2" />
      <RadioGroupItem value="option3" label="Option 3" />
    </RadioGroup>
  )
}
```

## API Reference

### RadioGroup

| Prop          | Type                               | Default      | Description                                 |
| ------------- | ---------------------------------- | ------------ | ------------------------------------------- |
| variant       | `'default' \| 'card' \| 'compact'` | `'default'`  | Component variant style                     |
| size          | `'sm' \| 'md' \| 'lg'`             | `'md'`       | Component size                              |
| orientation   | `'horizontal' \| 'vertical'`       | `'vertical'` | Layout orientation                          |
| value         | `string`                           | -            | Selected value in controlled mode           |
| defaultValue  | `string`                           | -            | Default selected value in uncontrolled mode |
| onValueChange | `(value: string) => void`          | -            | Callback when value changes                 |
| disabled      | `boolean`                          | `false`      | Whether to disable the entire component     |
| required      | `boolean`                          | `false`      | Whether the field is required               |
| name          | `string`                           | -            | Form field name                             |
| className     | `string`                           | -            | Custom CSS class name                       |

### RadioGroupItem

| Prop        | Type                                               | Default     | Description                                           |
| ----------- | -------------------------------------------------- | ----------- | ----------------------------------------------------- |
| value       | `string`                                           | -           | Option value (required)                               |
| label       | `string`                                           | -           | Option label text                                     |
| description | `string`                                           | -           | Option description text                               |
| dataValue   | `string \| number`                                 | -           | Data value to display                                 |
| dataType    | `'percentage' \| 'currency' \| 'number' \| 'text'` | `'text'`    | Data type                                             |
| dataStatus  | `'positive' \| 'negative' \| 'neutral'`            | `'neutral'` | Data status (affects color)                           |
| disabled    | `boolean`                                          | `false`     | Whether to disable this option                        |
| className   | `string`                                           | -           | Custom CSS class name                                 |
| children    | `React.ReactNode`                                  | -           | Custom child components (overrides default rendering) |

## License

ISC
