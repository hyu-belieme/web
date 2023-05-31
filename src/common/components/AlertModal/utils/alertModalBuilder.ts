import AlertModal from '@common/components/AlertModal/AlertModal.vue';

function build(key: string, content: string) {
  return {
    key,
    component: AlertModal,
    props: {
      content,
    },
    resolve: () => {},
    reject: () => {},
  };
}

export default build;
