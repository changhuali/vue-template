<template>
  <section :class="$style['todo-main']">
    <transition-group
      name="fade"
      tag="ul"
    >
      <li
        v-for="item in todoMVC.todoList"
        v-if="showTodo(item.status)"
        :key="item.id"
        :class="$style['todo-item']"
      >
        <CheckBox
          :cssStyle="{paddingLeft: '10px'}"
          :onChange="handleCompleteTodo.bind(null, item.id)"
          :value="item.status === 'COMPLETED'"
        />
        <p
          :class="[
            {
              [$style['todo-desc-completed']]: item.status === 'COMPLETED',
            },
          ]"
        >
          {{ item.desc }}
        </p>
        <button
          :class="$style.removeBtn"
          @click="handleRemoveTodo(item.id)"
        >
          ×
        </button>
      </li>
    </transition-group>
    <div :class="$style['todo-actions']">
      <span
        :class="$style.count"
      >
        {{ getLeftTodosCount() }} items left
      </span>
      <ul :class="$style['todo-filter']">
        <li
          v-for="(item, itemIdx) in filterConf"
          :key="itemIdx"
          :class="[
            $style.btn,
            {[$style.active]: item.value === todoMVC.filterStatus}
          ]"
          @click="handleUpdateFilterStatus(item.value)"
        >
          {{ item.label }}
        </li>
      </ul>
      <span
        :class="$style.clearBtn"
      >
        <span
          v-if="hasCompletedTodo()"
          @click="handleClearCompleted"
        >
          Clear completed
        </span>
      </span>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import CheckBox from 'components/common/CheckBox';

export default {
  components: {
    CheckBox,
  },
  data() {
    return {
      filterConf: [
        { label: 'All', value: 'ALL' },
        { label: 'Active', value: 'ACTIVE' },
        { label: 'Completed', value: 'COMPLETED' },
      ],
    };
  },
  computed: {
    ...mapState('todoMVC', {
      todoMVC: state => state,
    }),
  },
  methods: {
    ...mapActions('todoMVC', [
      'updateValue',
      'removeTodo',
      'completeTodo',
      'clearCompleted',
    ]),
    ...mapGetters('todoMVC', [
      'getLeftTodosCount',
      'hasCompletedTodo',
    ]),
    showTodo(status) {
      const { filterStatus } = this.todoMVC;
      return filterStatus === 'ALL'
        || status === filterStatus;
    },
    handleRemoveTodo(id) {
      this.removeTodo({
        id,
      });
    },
    handleUpdateFilterStatus(status) {
      this.updateValue({
        path: 'filterStatus',
        value: status,
      });
    },
    handleCompleteTodo(id, evt) {
      this.completeTodo({
        id,
        status: evt.target.checked,
      });
    },
    handleClearCompleted() {
      this.clearCompleted();
    },
  },
};
</script>

<style src="./index.less" module></style>
