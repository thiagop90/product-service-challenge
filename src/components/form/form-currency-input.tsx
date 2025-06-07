import { ChevronDown, ChevronUp } from 'lucide-react'
import {
  Button,
  Group,
  Input,
  NumberField,
  type NumberFieldProps,
} from 'react-aria-components'

export function FormCurrencyInput(props: NumberFieldProps) {
  return (
    <NumberField
      minValue={1}
      maxValue={999999.99}
      defaultValue={1}
      formatOptions={{
        style: 'currency',
        currency: 'BRL',
        currencySign: 'accounting',
      }}
      aria-label="Valor em reais"
      {...props}
    >
      <div className="*:not-first:mt-2">
        <Group className="border-input outline-none data-focus-within:border-ring data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40 data-focus-within:has-aria-invalid:border-destructive relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] data-disabled:opacity-50 data-focus-within:ring-[3px]">
          <Input className="bg-background text-foreground flex-1 px-3 py-2 tabular-nums" />
          <div className="flex h-[calc(100%+2px)] flex-col">
            <Button
              slot="increment"
              className="border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px flex h-1/2 w-6 flex-1 items-center justify-center border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronUp size={12} aria-hidden="true" />
            </Button>
            <Button
              slot="decrement"
              className="border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px -mt-px flex h-1/2 w-6 flex-1 items-center justify-center border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronDown size={12} aria-hidden="true" />
            </Button>
          </div>
        </Group>
      </div>
    </NumberField>
  )
}
