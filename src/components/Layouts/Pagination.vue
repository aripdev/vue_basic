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
        @click="prev"
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
        @click="next"
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
          <span class="font-medium">{{ configuration.total }}</span>
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
            @click="prev"
          >
            <span class="sr-only">Previous</span>
            <ChevronLeftIcon
              class="h-5 w-5"
              aria-hidden="true"
              :class="{ 'text-gray-300': !configuration.prev }"
            />
          </a>
          <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
          <div v-for="pages in numPages" :key="pages">
            <a
              href="#"
              aria-current="page"
              :class="{
                'z-10 bg-indigo-50 border-indigo-500 text-indigo-600':
                  pages == configuration.current,
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
              @click="changePage(pages)"
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
            @click="next"
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

const configuration = ref({
  total: 11,
  adjacent: 3,
  current: 1,
  range: 4,
  next: true,
  prev: true,
});

const infoPages = ref({
  start: 1,
  end: 0,
});

const numPages = doPaging(configuration.value.current, {
  range: configuration.value.range,
  pages: Math.ceil(configuration.value.total / configuration.value.adjacent),
});

function infoPagesStart() {
  if (configuration.value.current > 1) {
    infoPages.value.start =
      (configuration.value.current - 1) * configuration.value.adjacent + 1;
  } else {
    infoPages.value.start = 1;
  }
}

function infoPagesTo() {
  const x = infoPages.value.start - 1 + configuration.value.adjacent;

  if (configuration.value.total > x) {
    infoPages.value.end = x;
  } else {
    infoPages.value.end = configuration.value.total;
  }
}

function prev() {
  if (configuration.value.prev) {
    configuration.value.current -= 1;
    changePage(configuration.value.current);
  }
}
function next() {
  if (configuration.value.next) {
    configuration.value.current += 1;
    changePage(configuration.value.current);
  }
}

function loadConfiguration() {}

function doPaging(current, { range, pages, start = 1 }) {
  const paging = [];
  var i = Math.min(
    pages + start - range,
    Math.max(start, current - ((range / 2) | 0))
  );
  const end = i + range;
  while (i < end) {
    if (i > 0) {
      paging.push(`${i++}`);
    } else {
      i++;
    }
  }
  return paging;
}

function changePage(page) {
  configuration.value.current = parseInt(page);
  infoPagesStart();
  infoPagesTo();
}

onMounted(() => {
  infoPagesStart();
  infoPagesTo();
});

watchEffect(() => {
  if (configuration.value.current) {
    const current = configuration.value.current;

    if (current == 1) {
      configuration.value.prev = false;
    } else {
      configuration.value.prev = true;
    }

    if (numPages.length == current) {
      configuration.value.next = false;
    } else {
      configuration.value.next = true;
    }
  }
});
</script>

<style scoped>
.disabled-button {
  cursor: default;
}
</style>