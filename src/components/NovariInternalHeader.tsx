import React, {useEffect} from "react";
import {InternalHeader, Spacer} from "@navikt/ds-react";


const GuidePanel: React.FC = () => {
    useEffect(() => {
        document.body.setAttribute("data-theme", "novari"); // ✅ Set Novari theme
    }, []);
    return (
        <InternalHeader>
            <InternalHeader.Title as="h1">Novari Test</InternalHeader.Title>
            <Spacer />
            <InternalHeader.User name="Jennifer Maarberg" />
        </InternalHeader>
    );
};

export default GuidePanel;
