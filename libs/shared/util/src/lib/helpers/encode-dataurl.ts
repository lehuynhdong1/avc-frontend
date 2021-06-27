export function encodeDataUrl(file: File | null | undefined): Promise<string> {
  return new Promise<string>((resolve) => {
    if (!file) {
      resolve('');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(file);
  });
}
