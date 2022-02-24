<script>
  import IconList from "./IconList.svelte";  
  export let invalid, iconData;
</script>

<span 
  class="absolute flex p-1 h-full 
  {iconData.bg || 'bg-white'}"
>
  <span class="scale-75 sl:scale-100 flex h-full">
    <IconList bind:invalid 
      strokeCopy={iconData.stroke}
      {...iconData} 
    />
  </span>
</span>