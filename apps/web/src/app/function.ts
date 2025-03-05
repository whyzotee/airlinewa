export const delay = (delayInms: number) => {
    return new Promise((resolve) => setTimeout(resolve, delayInms));
};

export const openWindow = (url: string, windowName: string, width: number, height: number) => {
    const left = (screen.width - width) / 2;
    const top = (screen.height - height) / 4;

    return window.open(url, windowName, `width=${width},height=${height},top=${top},left=${left}`);
}