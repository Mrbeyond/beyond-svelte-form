<script>
  import { onMount } from "svelte";
    
  export let iconType, sWidth="2", stroke="currentColor",
    iconClass="h6 w6", invalid, strokeCopy;

    $: if(invalid){
    stroke= '#b82000';
    }else{
      stroke = strokeCopy;
    }

    onMount(()=>{
      strokeCopy= stroke;
    })

</script>

  {#if iconType=='email'}
  <svg xmlns="http://www.w3.org/2000/svg" class="{iconClass}" 
    fill="none" viewBox="0 0 24 24" {stroke}>
    <path stroke-linecap="round" stroke-linejoin="round" 
      stroke-width="{sWidth}" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 
      0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 
      8.959 0 01-4.5 1.207" 
    />
  </svg>
  {:else if  iconType=='up-lock'}
    <svg xmlns="http://www.w3.org/2000/svg" class="{iconClass}" 
      fill="none" viewBox="0 0 24 24" 
        {stroke}>
      <path stroke-linecap="round" stroke-linejoin="round" 
        stroke-width="{sWidth}" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 
        2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 
        0 00-8 0v4h8z" 
      />
    </svg>
  {:else if  iconType=='in-lock'}
    <svg xmlns="http://www.w3.org/2000/svg" class="{iconClass}" 
      fill="none" viewBox="0 0 24 24" {stroke}>
      <path stroke-linecap="round" stroke-linejoin="round" 
        stroke-width="{sWidth}" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 
        2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" 
      />
    </svg>
  {:else if iconType == 'user'}
    <svg xmlns="http://www.w3.org/2000/svg" class="{iconClass}" 
      fill="none" viewBox="0 0 24 24" {stroke}>
      <path stroke-linecap="round" stroke-linejoin="round" 
        stroke-width="{sWidth}" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 
        14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
      />
    </svg>
  {/if}
  <!-- Email -->
  
  <!-- Password -->
  
  <!-- User -->
  
  