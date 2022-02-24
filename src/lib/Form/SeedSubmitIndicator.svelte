<script>
  export let col ='#fff', dim = 15, count = 5;

  // console.log(count, dim, col);
  
</script>

<section style="--wid:{(dim*2)+2}px">
  {#each {length:count} as seed,i (i)}
    <div class="nim"
      style="animation-delay: {i*0.2}s; --dim: {dim}px; --col:{col}" >
    </div>
 {/each}

</section>

<style> 

  /* :root{
   --col: white;
   --dim: 20px;
  }
   */
  
  .nim{
    width: var(--dim);
    height: var(--dim);
    background: var(--col);
    display:inline-block;
    border-radius: 50%;
    animation: seeds 1s infinite alternate; 
    animation-delay: 0.2s;
  }
  
  /* Safari 4.0 - 8.0 */
  @-webkit-keyframes seeds {
      from {transform: scale(2); margin: 0px calc(var(--dim) / 2)}
      to {transform: scale(1); margin: 0px calc(var(--dim) / 5)}
  }
  
  @keyframes seeds {
      from {transform: scale(2); margin: 0px calc(var(--dim) / 2)}
      to {transform: scale(1); margin: 0px calc(var(--dim) / 5)}
  }
  
  section{
    display: inline-block;
    background-color: transparent;
    min-height:var(--wid);
    display:flex;
    width: max-content;
    align-items: center;
  }

  </style>