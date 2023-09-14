import AlertModal from '@common/components/modals/AlertModal/AlertModal.vue';

function build(key: string, content: string, hasCloseButton?: boolean) {
  return {
    key,
    component: AlertModal,
    props: {
      content,
      hasCloseButton,
    },
    resolve: () => {},
    reject: () => {},
  };
}

export default build;
