import {
	Component,
	Input,
	ViewChild,
	ElementRef,
	Output
} from "@angular/core";

import { Tab } from "./tab.component";
import { EventEmitter } from "@angular/core";

@Component({
	selector: "ibm-tab-header",
	template: `
		<li
			[ngClass]="{
				'bx--tabs__nav-item--selected': active,
				'bx--tabs__nav-item--disabled': disabled
			}"
			class="bx--tabs__nav-item"
			role="presentation"
			(click)="selectTab()">
			<a
				#tabItem
				[attr.aria-selected]="active"
				draggable="false"
				class="bx--tabs__nav-link"
				href="javascript:void(0)"
				[attr.tabindex]="(active? 0 : -1)"
				role="tab">
				<ng-content></ng-content>
			</a>
		</li>
	`
})

export class TabHeader {
	/**
	 * Indicates whether the `Tab` is active/selected.
	 * Determines whether it's `TabPanel` is rendered.
	 */
	@Input() active = false;
	/**
	 * Indicates whether or not the `Tab` item is disabled.
	 */
	@Input() disabled = false;
	/**
	 * Reference to the corresponsing tab pane.
	 */
	@Input() paneReference: Tab;
	/**
	 * Set to 'true' to have pane reference cached and not reloaded on tab switching.
	 */
	@Input() set cacheActive(shouldCache: boolean) {
		this._cacheActive = shouldCache;

		// Updates the pane references associated with the tab header when cache active is changed.
		if (this.paneReference) {
			this.paneReference.cacheActive = this.cacheActive;
		}
	}

	get cacheActive() {
		return this._cacheActive;
	}

	/**
	 * Value 'selected' to be emitted after a new `Tab` is selected.
	 */

	@Output() selected = new EventEmitter<any>();

	// @ts-ignore
	@ViewChild("tabItem", { static: false }) tabItem: ElementRef;

	protected _cacheActive = false;

	selectTab() {
		this.tabItem.nativeElement.focus();
		if (!this.disabled) {
			this.selected.emit();
			this.active = true;
			if (this.paneReference) {
				this.paneReference.active = true;
			}
		}
	}
}
