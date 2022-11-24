<template>
  <div
    class="
      bg-white
      px-4
      py-3
      flex
      items-center
      justify-between
      border-t border-gray-200
      sm:px-6
    "
  >
    <!-- Mobile View -->
    <div class="flex-1 flex justify-between sm:hidden">
      <a
        href="#"
        class="
          relative
          inline-flex
          items-center
          px-4
          py-2
          border border-gray-300
          text-sm
          font-medium
          rounded-md
          text-gray-700
          bg-white
        "
        :class="{
          'disabled-button': !configuration.prev,
          'text-gray-300': !configuration.prev,
          'hover:bg-gray-50': configuration.prev,
        }"
        @click.prevent="prev"
      >
        Previous
      </a>
      <a
        href="#"
        class="
          ml-3
          relative
          inline-flex
          items-center
          px-4
          py-2
          border border-gray-300
          text-sm
          font-medium
          rounded-md
          text-gray-700
          bg-white
          hover:bg-gray-50
        "
        :class="{
          'disabled-button': !configuration.next,
          'text-gray-300': !configuration.next,
          'hover:bg-gray-50': configuration.next,
        }"
        @click.prevent="next"
      >
        Next
      </a>
    </div>

    <!-- Desktop View -->
    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Showing
          {{ " " }}
          <span class="font-medium">{{ infoPages.start }}</span>
          {{ " " }}
          to
          {{ " " }}
          <span class="font-medium">{{ infoPages.end }}</span>
          {{ " " }}
          of
          {{ " " }}
          <span class="font-medium">{{ props.total }}</span>
          {{ " " }}
          results
        </p>
      </div>
      <div>
        <nav
          class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <!-- Prev -->
          <a
            href="#"
            class="
              relative
              inline-flex
              items-center
              px-2
              py-2
              rounded-l-md
              border border-gray-300
              bg-white
              text-sm
              font-medium
              text-gray-500
            "
            :class="{
              'disabled-button': !configuration.prev,
              'hover:bg-gray-50': configuration.prev,
            }"
            @click.prevent="prev"
          >
            <span class="sr-only">Previous</span>
            <ChevronLeftIcon
              class="h-5 w-5"
              aria-hidden="true"
              :class="{ 'text-gray-300': !configuration.prev }"
            />
          </a>
          <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
          <div v-for="pages in configuration.numPages" :key="pages">
            <a
              href="#"
              aria-current="page"
              :class="{
                'z-10 bg-indigo-50 border-indigo-500 text-indigo-600':
                  pages == props.current,
              }"
              class="
                relative
                inline-flex
                items-center
                px-4
                py-2
                border border-gray-300
                text-sm
                font-medium
              "
              @click.prevent="changePage(pages)"
            >
              {{ pages }}
            </a>
          </div>
          <!-- Next -->
          <a
            href="#"
            class="
              relative
              inline-flex
              items-center
              px-2
              py-2
              rounded-r-md
              border border-gray-300
              bg-white
              text-sm
              font-medium
              text-gray-500
            "
            :class="{
              'disabled-button': !configuration.next,
              'hover:bg-gray-50': configuration.next,
            }"
            @click.prevent="next"
          >
            <span class="sr-only">Next</span>
            <ChevronRightIcon
              class="h-5 w-5"
              aria-hidden="true"
              :class="{ 'text-gray-300': !configuration.next }"
            />
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";
import { onMounted, ref, watchEffect } from "vue";

const emit = defineEmits(["pageAction", "navAction"]);

const props = defineProps({
  total: Number,
  limit: Number,
  current: Number,
});

const configuration = ref({
  numPages: [],
  range: 4,
  next: true,
  prev: true,
});

const infoPages = ref({
  start: 1,
  end: 0,
});

function prev() {
  if (configuration.value.prev) {
    emit("navAction", "prev");
  }
}
function next() {
  if (configuration.value.next) {
    emit("navAction", "next");
  }
}

function loadShowNumberConfiguration() {
  // Defining show start number

  const _current = parseInt(props.current);

  infoPages.value.start = _current > 1 ? (_current - 1) * props.limit + 1 : 1;

  // Define showing to number

  const _startPage = parseInt(infoPages.value.start - 1 + props.limit);

  infoPages.value.end = props.total > _startPage ? _startPage : props.total;
}

function doPaging(current, { range, pages, start = 1 }) {
  const paging = [];
  var i = Math.min(
    pages + start - range,
    Math.max(start, current - ((range / 2) | 0))
  );
  const end = i + range;
  while (i < end) {
    if (i > 0) {
      paging.push(i);
    }
    i++;
  }
  return paging;
}

function setPagination() {
  configuration.value.numPages = doPaging(props.current, {
    range: configuration.value.range,
    pages: Math.ceil(props.total / props.limit),
  });
}

function changePage(page) {
  emit("pageAction", parseInt(page));
}

watchEffect(() => {
  const current = props.current;

  if (current) {
    loadShowNumberConfiguration();

    setPagination();

    configuration.value.prev = current != 1;

    const _numPages = configuration.value.numPages;

    configuration.value.next =
      _numPages.length == 1 ? false : _numPages.length != current;
  }
});
</script>

<style scoped>
.disabled-button {
  cursor: default;
}
</style>