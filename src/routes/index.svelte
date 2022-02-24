<script>
import BeyondForm from "$lib/Form/BeyondForm.svelte";
import Schema from "$lib/Schema";

let formSchema = [...Schema];
</script>

<div>

  <BeyondForm 
    bind:formSchema    
    buttonText="Sign In"
    buttonClass="embed"
    maxW="w-full"
  
  />

</div>