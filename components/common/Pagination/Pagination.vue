<template>
     <nav class="text-center" aria-label="Page navigation">
    <ul class="pagination pagination-sm">
      <li>
        <a href="#" @click="page = 1" aria-label="First">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li>
        <a href="#" v-if="page != 1" @click="page--" aria-label="Previous">
          <span aria-hidden="true">&lsaquo;</span>
        </a>
      </li>
      <li v-for="pageNumber in pages.slice(page-1, page+4)"><a href="#" @click="page = pageNumber">{{pageNumber}}</a></li>
      <li>
        <a href="#" @click="page++" v-if="page < pages.length" aria-label="Next">
          <span aria-hidden="true">&rsaquo;</span>
        </a>
      </li>
      <li>
        <a href="#" @click="page = pages.length" aria-label="Last">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
  </template>
  <script>
  export default {
    data() {
    return {
      page: 1,
        perPage: 10,
        pages: [],
        users:[],
    }
    },
    methods:{
      setPages() {
            var numberOfPages = Math.ceil(this.users.length / this.perPage);
            for (var index = 1; index <= numberOfPages; index++) {
                this.pages.push(index);
            }
        },
        paginate(users) {
            var page = this.page;
            var perPage = this.perPage;
            var from = (page * perPage) - perPage;
            var to = (page * perPage);
            return users.slice(from, to);
        },
    }

  };
  </script>
  <style>
  .pagination {
    list-style-type: none;
    width: 400px;
  }
  
  .pagination-item {
    display: inline-block;
  }
  
  .active {
    background-color: #4AAE9B;
    color: #ffffff;
  }
  </style>