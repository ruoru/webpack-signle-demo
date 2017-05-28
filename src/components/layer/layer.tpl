<div class="layer">
  <img src="${ require('../../assets/尼尔3.jpeg') }" />
  <h1>this is <%= name %> components</h1>
  <div>
    <% for(var i = 0; i < arr.length; i++) {%>
      <%= arr[i] %>
    <% } %>
  </div>
</div>