import { html } from 'lit-html';

export default model => html`
<section class="app">Hello! My name is <em>${model.title}</em>.</section>
`