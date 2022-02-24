<script>
  import SeedSubmitIndicator from "./SeedSubmitIndicator.svelte";
  import BeyondFormField from "./BeyondFormField.svelte";
  export let formSchema,
    note,
    buttonText, 
    buttonClass, 
    onSubmit, 
    maxW, 
    notedMaxW, 
    submitting;


  const getNestedOptions=(form, load)=>{
    if(!form || !load) return [];
    // get the parent name and data key from data object 
    //like =>parent.array_key;
    let on = form.on.trim().split('.');
    if(on.length < 2) return [];
    //check if parent name  exists
    let parent = load.find((data)=>data['name'] == on[0]);
    if(!parent || !parent.value) return [];
    // console.log({parent});
    /** load is the initial data before parsing children array  */
    let child= 
    parent.load.find((state)=>state.value == parent.value)[on[1]];
    // [on[1]] up means the child dependent key to get dependent value
    return {
      load:child,  // for children if any to continue the loop
      options:[...child.map((data)=>
        ({value:data[form.keys[0]], text:data[form.keys[1]]}))
      ]
    }
  }

  $:{
     if(formSchema?.find((load)=>load.on)){
      formSchema = formSchema.map((form, i, array)=>{
        if(form.on){
          return {...form, ...getNestedOptions(form, array)};
        }else{
          return form;
        }
      });
    }
  }

  // /** Vaidate form*/
  // const validate=async()=>{    
  //   formSchema = await formSchema.map(load=>({...load, checked:true}));
  //   // formSchema = formSchema;
  // }
  // /** Validate form then perform Parent Submit*/
  // const submit=async()=>{
  //   await validate();
  //   await onSubmit?.();
  // }
  
</script>

{#if formSchema}
  <div class="w-full text-center }">
    <form on:submit|preventDefault={onSubmit} >
      <div class="grid grid-cols-2 gap-4">
        {#each formSchema as params, i (i)}
          <div class="{params.note? notedMaxW: maxW} 
            { params.half?'col-span-1':'col-span-2'} 
            ml:gap-2 grid grid-cols-2"
          >
            {#if params.head}
              <div class="text-left">
                {@html params.head}
              </div>            
            {/if}
            <div class="{params.note?'col-span-2 ml:col-span-1':'col-span-2'}
             {maxW}"
            >
              <BeyondFormField bind:params />
            </div>
            {#if params.note}
              <div class="col-span-2 ml:col-span-1 text-left">
                {@html params.note}
              </div>
            {/if}

          </div>
        {/each} 
      </div>
      <div>
        <slot></slot>
      </div>
      <div class="mt-5">
        <button  type="submit" on:click={(e)=>{e.stopPropagation()}}      
          class="{buttonClass ||'btn'} rounded-xl {maxW ||'max-w-screen-xxe'}"
        >
          {#if submitting}
            <div class="h-full w-full flex justify-center py-1.5">
              <SeedSubmitIndicator col="white" count="5" dim="12" />              
            </div>
          {:else}
            <span>
              {buttonText || 'Submit'}
            </span>
          {/if}
        </button>
      </div>
      {#if note}
        <div class="my-3">{note}</div>
      {/if}
    </form>
  </div>
{/if}

<style>

  .btn{
    @apply rounded font-medium text-center
  }



   
</style>