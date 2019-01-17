<template>
  <header
    :class="$style['todo-header']"
  >
    <div :class="$style['input-box']">
      <CheckBox
        :cssStyle="{paddingLeft: '10px'}"
        :onChange="handleCompleteAllTodos"
        :value="allTodosAreCompleted()"
      />
      <input
        :value="todoMVC.todoInput"
        :class="$style['todo-input']"
        placeholder="What needs to be done?"
        @input="handleTodoInput"
        @keyup.enter="handleAddTodo"
      >
    </div>
  </header>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import CheckBox from 'components/common/CheckBox';

export default {
  components: {
    CheckBox,
  },
  computed: {
    ...mapState('todoMVC', {
      todoMVC: state => state,
    }),
  },
  methods: {
    ...mapActions('todoMVC', [
      'updateValue',
      'addTodo',
      'completeAllTodos',
    ]),
    ...mapGetters('todoMVC', [
      'allTodosAreCompleted',
    ]),
    handleTodoInput(evt) {
      const todoDesc = evt.target.value;
      this.updateValue({
        path: 'todoInput',
        value: todoDesc,
      });
    },
    handleAddTodo(evt) {
      const todoDesc = evt.target.value;
      if (todoDesc && todoDesc.trim()) {
        const todo = {
          desc: todoDesc,
          status: 'ACTIVE',
          id: Date.now(),
        };
        this.addTodo({
          todo,
        });
        this.updateValue({
          path: 'todoInput',
          value: '',
        });
      }
    },
    handleCompleteAllTodos(evt) {
      this.completeAllTodos({
        status: evt.target.checked,
      });
    },
  },
};
</script>

<style src="./index.less" module></style>
