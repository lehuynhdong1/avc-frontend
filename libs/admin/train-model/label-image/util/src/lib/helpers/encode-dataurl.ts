export function encodeDataUrl(file: File): Promise<string> {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = function () {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(file);
  });
}
