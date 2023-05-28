const useTest = <KType extends keyof SomeType>(key: KTYpe) => {
  console.log(key, "k should be a keyof sometype");
};
