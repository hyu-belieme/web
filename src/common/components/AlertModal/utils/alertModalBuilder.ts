import AlertModal from "@common/components/AlertModal/AlertModal.vue";

export const build = (key: string, content: string) => {
  return {
    key: key,
    component: AlertModal,
    props: {
      content: content
    },
    resolve: () => {},
    reject: () => {}
  };
};
