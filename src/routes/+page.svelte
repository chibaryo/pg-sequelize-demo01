<script lang="ts">
  import { invalidateAll } from '$app/navigation'
  import { enhance, applyAction } from '$app/forms'

  import type { PageData } from './$types'
  export let data: PageData
  //console.log(users.every(user => user instanceof User)); // true

  import pencilIcon from '$lib/assets/icons/pencil-alt.svg'
  import trashIcon from '$lib/assets/icons/trash-o.svg'

  // Components
  import FlyModal from './FlyModal.svelte'

  // Flags
  let modalOpen: HTMLDialogElement
  let isModalOpen = false
  let is_hidden: HTMLElement

  // fn

  // computed
  $: {
    if (is_hidden) {
      if (isModalOpen) is_hidden.classList.remove('hidden')
      else is_hidden.classList.add('hidden')
    }
  }
</script>

<!-- Modal toggle -->
<button
  data-modal-target="authentication-modal"
  data-modal-toggle="authentication-modal"
  class="btn btn btn-sm btn-outline btn-success"
  type="button" on:click={() => isModalOpen = true}>
  新規登録
</button>

<!-- Main modal -->
<div
  id="authentication-modal"
  tabindex="-1"
  aria-hidden="true"
  bind:this={is_hidden}
  class="overflow-y-auto overflow-x-hidden fixed top-20 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    県庁所在地登録
                </h3>
                <button type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal" on:click={() => isModalOpen = false}>
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <div class="p-4 md:p-5">
                <form class="space-y-4" method="POST" action="?/addpref">
                    <div>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">県名</label>
                        <input type="text" name="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="○○県" required>
                    </div>
                    <div>
                        <label for="prefCapital" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">県庁所在地</label>
                        <input type="text" name="prefCapital" placeholder="△△市" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                    </div>
                    <button
                      type="submit"
                      class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >登録</button>
                    <button
                      type="button"
                      class="w-full text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                      on:click={() => isModalOpen = false}
                      >キャンセル</button>
                </form>
            </div>
        </div>
    </div>
</div> 

<section>
  <div class="overflow-x-auto">
    <table class="table table-sm table-zebra">
			<thead>
				<tr>
					<th>uuid</th>
          <th>県名</th>
          <th>県庁所在地</th>
          <th colspan="2">操作</th>
        </tr>
			</thead>
      <tbody>
        {#if data.posts}
        {#each JSON.parse(data.posts) as row}
          <tr>
            <td>{row.uuid}</td>
            <td>{row.name}</td>
            <td>{row.prefCapital}</td>
            <td><img src={pencilIcon} alt="edit" /></td>
            <td><img src={trashIcon} alt="delete" /></td>
          </tr>
        {/each}
        {/if}
      </tbody>
    </table>
	</div>

</section>
