<script>
  import { buildStyle } from "helpers";

  export let opacity = ""
  export let margin = ""
  export let padding = ""

  $: style = buildStyle({opacity, margin, padding})

</script>

<span {style} class="mdc-typography--body1">
  <slot />
</span>
