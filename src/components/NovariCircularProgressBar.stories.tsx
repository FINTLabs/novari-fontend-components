import type { Meta, StoryObj } from "@storybook/react";
import NovariCircularProgressBar from "./NovariCircularProgressBar";

const meta = {
    title: "Novari/NovariCircularProgressBar",
    component: NovariCircularProgressBar,
    tags: ["autodocs"],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: "A versatile component that shows progress and percentage of two values given. " +
                    "It calculates the percentage of **value** from **maxValue** and displays the rounded" +
                    " down percentage while visualizing the progression through the circle. ",
            }
        }
    },
    args: {
        maxValue: 54,
        value: 24
    }
} satisfies Meta<typeof NovariCircularProgressBar>

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    parameters: {
        docs: {
            codePanel: true,
            description: {
                story: "These are the colors the component will default to if colors aren't specified:" +
                    " Novari Blålilla and Burgunder.",
            }
        }
    },
};

export const Custom: Story = {
    parameters: {
        docs: {
            codePanel: true,
            description: {
                story: "You may of course choose any colors you see fit for your application, like for example the" +
                    " Novari Beige and Korall as shown here. Both the Progression Circle itself and the shadow" +
                    " around it will take on the colors you desire. firstColor specifies the color and shadow on" +
                    " top, and secondColor specifies the bottom."
            }
        }
    },
    args: {
        maxValue: 300,
        value: 299,
        firstColor: "#F8ECDC",
        secondColor: "#F76650",
    }
};