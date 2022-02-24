<script>
	import InputIcon from './../FormIcons/index.svelte';
  import { onMount } from "svelte";
  export let params;
  // destructure out current field props
  let { 
    type, // input type :String
    invalid, // checks if field is valid :Boolean
    regex, //Validation regex expression :Regex
    errorMessage, //Validation error message :String
    holder, // Field placeholder
    fileAllowed, // String comma separated list of allowed file type
    row, // Textarea field row :Int
    col, // Textarea field row :Int
    fileRules, // Object having size:Int, length:Int, required:Boolean for file validaton
    optional, // Don't impose validation :Boolean
    optionClass, //CSS class name for select options :String 
    label, // Text for field label :String
    maxLen, // int type field maximum length :Int
    style,  // Field style :String   
    className, // Field's css class name :String
    contClass, // Field's input's parent div css class name :String
    wrapper, // Field's parent includes error part css class name :String
    min, // Minimum value for type Number/Date field :Int/String respectively
    max, // Minimum value for type Number/Date field :Int/String respectively
    labelStyle, // Field's label text style :String
    labelClass,  // Field's label text css class name :String  
    optionStyle, // Select type options' style :String
    iconData, // // Object having Icon's props size:Int, length:Int, required:Boolean 
    boxContainerClass, // Field's container css class name, Input & Icon :String
  } = params || {};

  let randomId = params.name+Math.floor(Math.random()* (100 -10)+ 10)+
   `${Date.now()}`;

  let elem, filer;

  const SPECKEY = ['Backspace', 'Tab', 'Enter', 'Control', 'Home', 'Delete', 'End', 'ArrowLeft', 'ArrowRight']
  let pos, prelength;
  // $: if(params.on) console.log('on get', params.name, params.value, params.options, options);

  const mailRegex =(val)=>{
    if(/^\w+\.?\w+@\w+\.?\w+\.\w+$/.test(val.trim())) return true;
    if(/^\w+\.?\w*@\w+\.\w+$/.test(val.trim())) return true;
    return false;
  }

  $: if(params.checked){
    validate()
  }

  const valueChecker=(value)=>{    
    if(type == 'email'){
      invalid = optional?( value && !mailRegex(value)? true: false)
      :(!mailRegex(value)? true: false);
    }
    else if(type == 'select'){
      invalid = !value && !optional? true : false;
    }
    else{
      invalid = !regex? false: !regex.test(value.trim())? true: false;
    }
    return params.invalid = invalid;
  }

  const checkBlur=({target:{value}})=>{
    // console.log({value});
    valueChecker(value);
  }

  const expiryKeyupper=(e)=>{    
    let prev = e.target.value.replace(/\//g, '').trim();
    if(prev.length > 4) prev = prev.slice(0,4);
    // alert(prev)
    pos = e.target.selectionStart;
    prev = prev?prev.match(/.{1,2}/g).join('/'): prev;
    params.value = prev;
    if(pos && (['Backspace', 'Delete'].includes(e.key) || 
    (pos < prev.length && prev.length > prelength) || (prelength > prev.length))){
      pos = prev.length - prelength == 2? pos+2: pos;
      e.target.selectionStart = pos;
      e.target.selectionEnd = pos;
    } 

  }
  // || pos < prev.length 
  const cardNumberKeyupper=(e)=>{
    let prev = e.target.value.replace(/\s/g, '').trim();
    if(prev.length > 16) prev = prev.slice(0,16);
    pos = e.target.selectionStart;
    // console.log({pos});
    prev =prev? prev.match(/.{1,4}/g).join(' '): prev;
    params.value = prev;
    // console.log(e.target.value);
    
    if(pos && (['Backspace', 'Delete'].includes(e.key) || 
    (pos < prev.length && prev.length > prelength) || (prelength > prev.length))){
      pos = prev.length - prelength == 2? pos+2: pos;
      e.target.selectionStart = pos;
      e.target.selectionEnd = pos;
    } 
    // alert(e.key)
  }

  const numOnly=(e)=>{
    // let len= e.target.value.length;
    // if(prev.length > 16) prev = prev.slice(0,16);
    // console.log(e.key, e.target.maxLength);
    if( (isNaN(e.key) && !SPECKEY.includes(e.key))) return e.preventDefault();
    prelength = e.target.value.length;
  }

  const DigitOnly=(e)=>{
    if(params.onlyDigit && ['.','-','+'].includes(e.key)) return e.preventDefault();
    // alert(maxLen)
      // e.preventDefault();
    console.log(e.target.value.length, params.value.length, maxLen);
    if(maxLen && e.target.value.length >= maxLen && /^\d$/.test(e.key))
     return e.preventDefault();
  }

  // length, required, size;

  const fileChecker=(files)=>{
    if(!fileRules || !Object.keys(fileRules).length) return params.invalid = false;
    if(fileRules['length']){
      invalid = !files || files?.length > fileRules['length'];
    }
    if(fileRules['required']){
     invalid = !files || !files?.length;
    }
    if(fileRules['size']){
      invalid = files.reduce((ac, cu)=>ac+cu.size, 0) > fileRules['size'];
    }
     
    return params.invalid = invalid;
  }

  const validate=()=>{
    if(!elem) return;
    if(type=='file' || type=='multiple-files'){
      fileChecker(elem.files)
    }else{
      valueChecker(elem.value);     
    }
  }

  onMount(()=>{
    if (filer) {
      filer.ondragover=(e)=>{
        e.preventDefault();
        
      }
  
      filer.ondragleave=(e)=>{
        e.preventDefault();
      }
  
      filer.ondrop=async(e)=>{
        e.preventDefault();
        let _files = e.dataTransfer.files;   
        if (!_files || !_files.length) return;
        if(!fileAllowed) return elem.files = _files;
        let accepts = fileAllowed?.trim().replace(/\s/g, "").replace(/,/g, " ").split(' ');
        try {    
          invalid = false;      
          if(accepts.length){            
            for(let j=0; j<_files.length; j++){
              if(!accepts.includes('.'+_files[j].type.split('/')[1]) &&
                !accepts.some((accept)=> accept.endsWith('*') && accept.split('/')[0] == _files[j].type.split('/')[0])
              ){
                invalid = true;
                break
              }          
            }
          }
          console.log(_files, accepts, invalid);
          params.invalid = invalid;
          if(!invalid) return elem.files = _files;
          return elem.value = '';
        } catch (error) {
          return  console.log({fileDropError:error});          
        }
      }      
    }
  })
  // console.log(className);

</script>
<div class="{wrapper || 'w-full flex justify-center'}">
  <!-- If field meta -->
  {#if params}
    <div class="{contClass || 'w-full'} ">
      <!-- If type is file -->
      {#if type=='file' || type=='multiple-files'}
        <label bind:this={filer} for="{randomId}"
          class="{className || 'filer'} text-center" 
        >
          <input bind:this={elem} hidden id="{randomId}" type="file"
             multiple={type=='multiple-files'} bind:files={params.value}
             accept={fileAllowed || ''}
          />
          {#if elem && elem.files?.length}
            <div class="text-sm">{elem.files.length} file(s)</div>
            <div class="text-sm truncate">{elem.files[0].name}</div>
          {:else}
            <span class="text-gray-400 text-sm block">
              Drag and Drop file here
            </span>
            <div class="w-full flex justify-center my-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" 
                fill="none" viewBox="0 0 24 24" stroke="#6CD4FF"
              >
                <path stroke-linecap="round" stroke-linejoin=" || ''round" stroke-width="2" 
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <span class="select-file">
              Select file 
            </span>

            <span class="file-label">
              {holder || ''}
            </span>            
          {/if}
        </label>
      {:else}
        <div class="w-full text-left">
          <!-- If label -->
          {#if label}
            <label class="{labelClass || 'block pl-2 text-gray-400'}"
              for="{randomId}" style="{labelStyle}"
            >
              {label}
            </label>
          {/if}

          <!-- If type is select -->
          {#if type == 'select' }
            <div>
              <!-- This caused unselecting issue on mobile
                 on:change={checkBlur}  -->
              <select id="{randomId}" 
                class="{className || 'default'} text-gray-400 " 
                 {style} on:blur={checkBlur}
                bind:value="{params.value}" bind:this={elem}
              >
                {#if holder}
                  <option class="{optionClass} || options" value="" 
                   selected hidden disabled style="{optionStyle}"
                  >
                    {holder}
                  </option>
                {/if}
                {#each params.options as option}
                  <option value="{option.value}" style="{optionStyle}"
                    class="{optionClass || 'options'}"
                  >
                    {option.text}
                  </option>
                {/each}
              </select>
            </div>
          {:else if  type == 'password'}
            <div class="relative {boxContainerClass}"
              class:border_inavlid={invalid}
            >
              {#if iconData}
                <InputIcon bind:invalid {iconData} />
              {/if}
              <input placeholder="{holder}" type="password"
                on:blur={checkBlur} {style} id="{randomId}"                 
                class="{(className || 'default ')} 
                {iconData?'pr-2 pl-12':'px-2'} "
                class:error={invalid}
                bind:value="{params.value}" bind:this={elem} 
              />
            </div>
          {:else if type == 'number'}
            <div>
              <input id="{randomId}" placeholder="{holder}" type="number"
                on:blur={checkBlur} {style} bind:this={elem} 
                bind:value="{params.value}" on:keydown={DigitOnly}
                min={min || Number.NEGATIVE_INFINITY } pattern="[0-9]*"
                class="{invalid?'error': (className || 'default')}"                 
                max={max || Number.NEGATIVE_INFINITY }
              />
            </div>
          {:else if  type == 'int'}
            <div class="relative">
              {#if iconData}
                <InputIcon bind:invalid {iconData} />
              {/if}
              <input id="{randomId}" placeholder="{holder}"
                on:blur={checkBlur} {style} bind:this={elem} 
                bind:value="{params.value}" maxlength={maxLen}
                on:keydown={numOnly} inputmode="numeric" pattern="[0-9]*"                
                class="{(className || 'default ')}
                {iconData?'pr-2 pl-12':'px-2'} "
                class:error={invalid}
              />
            </div>
          {:else if  type == 'textarea'}
            <div>
              <textarea cols={col || 20} rows={row||5} id="{randomId}"
                 placeholder="{holder}" maxlength={maxLen || 10000} 
                on:blur={checkBlur} {style} bind:this={elem}                 
                class="{invalid?'error': (className || 'default')}"                
                bind:value="{params.value}" 
              />
            </div>
          {:else if  type == 'card-expiry'}
            <div>
              <input id="{randomId}" placeholder="{holder}" 
                on:keydown={numOnly} on:keyup={expiryKeyupper}
                on:blur={checkBlur} {style} bind:this={elem} 
                class="{invalid?'error':(className || 'default')}"
                inputmode="numeric" pattern="[0-9/]*"
                bind:value="{params.value}" maxlength="5"  
              />
            </div>
          {:else if  type == 'card-number'}
            <div>
              <input id="{randomId}" placeholder="{holder}" 
                on:blur={checkBlur} on:keyup={cardNumberKeyupper} 
                maxlength="19" on:keydown={numOnly}  {style} 
                class="{invalid?'error':(className || 'default')}" 
                inputmode="numeric"  pattern="[0-9 ]*"
                bind:this={elem}  bind:value="{params.value}"          
              />
            </div>
          {:else if type == 'date'}
            <div>
              <input id="{randomId}" placeholder="{holder}" type="date"
                class="{invalid?'error':(className || 'date-default')}"
                {max} {min} on:blur={checkBlur} {style}
                bind:this={elem}  bind:value="{params.value}" 
              >
            </div>
          {:else if type == 'email'}
            <!-- type email -->
            <div class="relative {boxContainerClass}"
              class:border_inavlid={invalid}
            >
              {#if iconData}
                <InputIcon bind:invalid {iconData} />
              {/if}
              <input id="{randomId}" placeholder="{holder}" 
              on:blur={checkBlur} {style} type="email"
              class="{(className || 'default ')} 
                {iconData?'pr-2 pl-12':'px-2'} "
              class:error={invalid}
              bind:this={elem} bind:value="{params.value}" 
              />
            </div>
          {:else}

            <!-- type text -->
            <div class="relative {boxContainerClass}"
             class:border_inavlid={invalid}
            >
              {#if iconData}
                <InputIcon bind:invalid {iconData} />
              {/if}
              <input id="{randomId}" placeholder="{holder}" 
              on:blur={checkBlur} {style}
              class="{(className || 'default ')} 
                {iconData?'pr-2 pl-12':'px-2'} "
              class:error={invalid}
              bind:this={elem} bind:value="{params.value}" 
              />
            </div>
          {/if} 
        </div>
      {/if}
        
      <!-- Ivalid message -->
      {#if invalid}
        <div class="text-center text-red-400">
          {errorMessage || "Invalid field"}
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .options{
    @apply bg-gray-50 py-2 hover:bg-gray-100
  }

  .filer{     
    @apply block bg-white w-full border border-dashed 
    rounded-xl pb-3 pt-5 relative
  }


  .file-label{
    /* max-width: 50px; */
    @apply absolute max-w-full  top-2 left-0  text-gray-500 text-sm
  }

  .select-file{
    text-underline-offset: 2px;
    @apply underline block;
  }

  .default{
    @apply w-full text-neutral-700
    bg-white text-lg md:py-1 border
  }

  .date-default{
    @apply px-2 py-1 border rounded w-full font-medium
    bg-white  focus:border-2 text-gray-400
    border-opacity-90 tracking-wide uppercase h-full  
    focus:border-opacity-100   
  }

  input:focus{ 
    /* @apply w-full text-lg */
  }

  .error{
    @apply w-full text-base
     border-red-300 bg-red-100 text-red-800 
  }

 .border_inavlid{
    @apply border-red-300 bg-red-100
  }

  .default::placeholder{
    font-size: 90%;
  }

  ::-webkit-calendar-picker-indicator {
     filter: drop-shadow(2px 2px 14px grey);
     @apply mx-0 text-xl cursor-pointer
  }

  ::-webkit-datetime-edit-text { padding: 0 2px; }
</style>