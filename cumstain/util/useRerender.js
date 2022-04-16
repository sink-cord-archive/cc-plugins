import { useState } from "@cumcord/modules/common/React";

export default () => {
    const [curr, set] = useState(0);
    return () => set(-curr);
};
