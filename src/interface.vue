<template>
  <div>
    <v-button
      :loading="isLoading"
      @click="click"
      :class="buttonType"
      :secondary="buttonType !== 'primary'"
      :icon="!label"
    >
      <v-icon v-if="icon" left :name="icon" />
      {{ label }}
    </v-button>
  </div>
</template>

<script>
import { defineComponent, ref, inject, computed } from "vue";
import { useRouter } from "vue-router";
import { useApi, useStores } from "@directus/extensions-sdk";
import { render } from "micromustache";
import { useI18n } from "vue-i18n";

export default defineComponent({
  emits: ["input"],
  props: {
    label: {
      type: String,
      default: null,
    },
    buttonType: {
      type: String,
      default: null,
    },
    value: {
      type: Boolean,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    url: {
      type: String,
      default: null,
    },
    method: {
      type: String,
      default: "patch",
    },
    body: {
      type: Object,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    collection: {
      type: String,
      required: true,
    },
    result: {
      type: String,
    },
    headers: {
      type: Array,
    },
    primaryKey: {
      type: [String, Number],
      required: true,
    },
  },
  setup(props) {
    const { useNotificationsStore } = useStores();
    const store = useNotificationsStore();
    const router = useRouter();
    const api = useApi();
    const isLoading = ref(false);
    const values = inject("values");
    const { t } = useI18n();

    return {
      isLoading,
      label: computed(() => render(props.label, values.value)),
      async click() {
        isLoading.value = true;

        try {
          const item = values.value;
          console.log(item);
          const url =
            render(props.url, item) ||
            `/items/${props.collection}/${props.primaryKey}`;
          const data = props.body ? maybeJson(render(props.body, item)) : false;
          const method = props.method || "patch";

          const headers = props.headers
            ? Object.fromEntries(
                props.headers.map(({ key, value }) => [
                  key,
                  render(value, item),
                ])
              )
            : false;

          console.log({
            method,
            url,
            data,
            headers,
          });

          const result = await api.request({
            method,
            url,
            data,
            headers,
          });

          if (props.result === "list") {
            router.push(`/content/${props.collection}`);
          } else {
            store.add({
              title: result.title || "Success",
              text: result.text || "Action was completed successfully",
              type: "success",
              dialog: true,
            });
          }
        } catch (error) {
          console.warn(error);

          const code =
            error.response?.data?.errors?.[0]?.extensions?.code ||
            error.extensions?.code ||
            "UNKNOWN";

          const message =
            error.response?.data?.errors?.[0]?.message ||
            error.message ||
            undefined;

          store.add({
            title: t(`errors.${code}`),
            text: message,
            type: "error",
            dialog: true,
            error,
          });
        } finally {
          isLoading.value = false;
        }
      },
    };

    function maybeJson(str) {
      try {
        return JSON.parse(str);
      } catch (e) {
        return str;
      }
    }
  },
});
</script>

<style scoped>
.info {
  --v-button-background-color: var(--blue);
  --v-button-background-color-hover: var(--blue-125);
  --v-button-color: var(--blue-alt);
  --v-button-color-hover: var(--blue-alt);
}

.success {
  --v-button-background-color: var(--success);
  --v-button-background-color-hover: var(--success-125);
  --v-button-color: var(--success-alt);
  --v-button-color-hover: var(--success-alt);
}

.warning {
  --v-button-background-color: var(--warning);
  --v-button-background-color-hover: var(--warning-125);
  --v-button-color: var(--warning-alt);
  --v-button-color-hover: var(--warning-alt);
}

.danger {
  --v-button-icon-color: var(--white);
  --v-button-background-color: var(--danger);
  --v-button-background-color-hover: var(--danger-125);
  --v-button-color: var(--danger-alt);
  --v-button-color-hover: var(--danger-alt);
}
</style>
