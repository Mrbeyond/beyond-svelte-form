<script>
import BeyondForm from "$lib/Form/BeyondForm.svelte";
import Schema from "$lib/Schema";

let formSchema = [...Schema];

const onSubmit=async(value)=>{
  console.log(value);
}
</script>

<div>
  <div>
    <BeyondForm 
      bind:formSchema    
      buttonText="Sign In"
      buttonClass="embed"
      maxW="w-full"
      {onSubmit}
    
    />
  </div>


</div>