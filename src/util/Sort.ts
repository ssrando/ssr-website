export const durationSort = (a: string, b: string) => {
    const aDur = a.split(':');
    const bDur = b.split(':');

    if (aDur.length > bDur.length) {
        return 1;
    }
    if (bDur.length > aDur.length) {
        return -1;
    }
    for (let i = 0; i < aDur.length; i++) {
        const aNum = Number(aDur[i]);
        const bNum = Number(bDur[i]);
        if (aNum !== bNum) return aNum - bNum;
    }
    return 0;
};

export default {};
