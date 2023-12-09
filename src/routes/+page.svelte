<script lang="ts">
  import { invalidateAll } from '$app/navigation'
  import { enhance, applyAction } from '$app/forms'

  import type { PageData } from './$types'
  export let data: PageData

  // Import store
  import { prefsStore } from './store'
  prefsStore.set(JSON.parse(data.posts))

  import pencilIcon from '$lib/assets/icons/pencil-alt.svg'
  import trashIcon from '$lib/assets/icons/trash-o.svg'

  // Components
	import type { PrefectureDoc } from '$lib/server/postgres/models/Prefecture'

  // Flags
  let isModalOpen = false
  let isDeleteModalOpen = false
  let is_hidden: HTMLElement
  let is_delmodal_hidden: HTMLElement

  // Vars
  let currentRow: PrefectureDoc

  // fn
  const handleEditRow = async (row: PrefectureDoc) => {
    currentRow = row
    isModalOpen = true
  }
  const handleDeleteRow = async (row: PrefectureDoc) => {
    currentRow = row
    isDeleteModalOpen = true
  }

  const deleteRow = async (currentRow: PrefectureDoc) => {
    console.log("del target uuid: ", currentRow.uuid)

    const resp = await fetch(`/api/prefecture/${currentRow.uuid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const deldata = await resp.json()
    console.log("data: ", deldata)
    $prefsStore = $prefsStore.filter((r) => {
      return r.uuid !== currentRow.uuid
    })

    isDeleteModalOpen = false

  }

  const closeModal = async () => {
    isModalOpen = false
    currentRow.name = ''
    currentRow.prefCapital = ''
  }

  const closeDeleteModal = async () => {
    isDeleteModalOpen = false
  }

  // computed
  $: {
    if (is_hidden) {
      if (isModalOpen) is_hidden.classList.remove('hidden')
      else is_hidden.classList.add('hidden')
    }

    if (is_delmodal_hidden) {
      if (isDeleteModalOpen) is_delmodal_hidden.classList.remove('hidden')
      else is_delmodal_hidden.classList.add('hidden')
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
  class="hidden overflow-y-auto overflow-x-hidden fixed top-20 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    県庁所在地登録
                </h3>
                <button type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal" on:click={() => closeModal()}>
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
                        <label for="prefName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">県名</label>
                        {#if currentRow}
                        <input
                          type="text"
                          name="name"
                          id="prefName"
                          autocomplete="address-level1"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="○○県"
                          value={currentRow.name}
                          required>
                        {:else}
                        <input
                          type="text"
                          name="name"
                          id="prefName"
                          autocomplete="address-level1"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="○○県"
                          required>
                        {/if}
                    </div>
                    <div>
                        <label for="prefcapital" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">県庁所在地</label>
                        {#if currentRow}
                        <input
                          type="text"
                          name="prefCapital"
                          id="prefcapital"
                          autocomplete="address-level2"
                          placeholder="△△市"
                          value={currentRow.prefCapital}
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          required>
                        {:else}
                        <input
                          type="text"
                          name="prefCapital"
                          id="prefcapital"
                          autocomplete="address-level2"
                          placeholder="△△市"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          required>
                        {/if}
                    </div>
                    <button
                      type="submit"
                      class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >登録</button>
                    <button
                      type="button"
                      class="w-full text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                      on:click={() => closeModal()}
                      >キャンセル</button>
                </form>
            </div>
        </div>
    </div>
</div> 

<!-- Delete modal -->
<div
  id="popup-modal"
  tabindex="-1"
  class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
  bind:this={is_delmodal_hidden}
  >
  <div class="relative p-4 w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span class="sr-only">Close modal</span>
          </button>
          <div class="p-4 md:p-5 text-center">
              <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
              </svg>
              <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
              <button
                data-modal-hide="popup-modal"
                type="button"
                on:click={() => deleteRow(currentRow)}
                class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
                >
                  Yes, I'm sure
              </button>
              <button
                data-modal-hide="popup-modal"
                type="button"
                class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                on:click={() => closeDeleteModal()}
                >No, cancel</button>
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
        {#if $prefsStore}
        {#each $prefsStore as row}
          <tr>
            <td>{row.uuid}</td>
            <td>{row.name}</td>
            <td>{row.prefCapital}</td>
            <td><button type="button" on:click={() => handleEditRow(row)}><img src={pencilIcon} alt="edit" /></button></td>
            <td><button type="button" on:click={() => handleDeleteRow(row)}><img src={trashIcon} alt="delete" /></button></td>
          </tr>
        {/each}
        {/if}
      </tbody>
    </table>
	</div>

</section>
