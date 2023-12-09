<script lang="ts">
	import type { PageData } from './$types'
  export let data: PageData
  //console.log(users.every(user => user instanceof User)); // true

  import pencilIcon from '$lib/assets/icons/'
  import trashIcon from '$lib/assets/icons/'
</script>

<section>
  <form method="POST" action="?/addpref">
    <div>
      <label for="name">県名
        <input type="text" name="name" />
      </label>
    </div>
    <div>
      <label for="prefCapital">県庁所在地
        <input type="text" name="prefCapital" />
      </label>
    </div>
    <button type="submit">Submit</button>
  </form>

  <table>
    <thead>
      <tr>
        <th>uuid</th>
        <th>県名</th>
        <th>県庁所在地</th>
        <th colspan="2">操作</th>
      </tr>
    </thead>
    <tbody>
      {#each JSON.parse(data.posts) as row}
        <tr>
          <td>{row.uuid}</td>
          <td>{row.name}</td>
          <td>{row.prefCapital}</td>
          <td><img src={pencilIcon} alt="edit" /></td>
          <td><img src={trashIcon} alt="delete" /></td>
        </tr>
      {/each}
    </tbody>
  </table>
</section>
