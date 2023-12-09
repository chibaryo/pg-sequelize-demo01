<script lang="ts">
	import type { PageData } from './$types'
  export let data: PageData
  //console.log(users.every(user => user instanceof User)); // true
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
      </tr>
    </thead>
    <tbody>
      {#each JSON.parse(data.posts) as row}
        <tr>
          <td>{row.uuid}</td>
          <td>{row.name}</td>
          <td>{row.prefCapital}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</section>
