import {
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition,
} from "@headlessui/react";
import "./TooltipText.css";

interface TooltipTextProps {
	text: string;
}

export const TooltipText: React.FC<TooltipTextProps> = ({ text }) => {
	return (
		<Popover className="relative">
			<PopoverButton className="tooltip-button">{text}</PopoverButton>
			<Transition
				enter="transition ease-out duration-200"
				enterFrom="opacity-0 translate-y-1"
				enterTo="opacity-100 translate-y-0"
				leave="transition ease-in duration-150"
				leaveFrom="opacity-100 translate-y-0"
				leaveTo="opacity-0 translate-y-1"
			>
				<PopoverPanel
					anchor="top"
					className="tooltip-panel [--anchor-gap:10px]"
				>
					{text}
				</PopoverPanel>
			</Transition>
		</Popover>
	);
};
