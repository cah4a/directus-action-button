import InterfaceComponent from './interface.vue';

export default  {
	id: 'action-button',
	name: 'Action Button',
	description: 'Send HTTP requests',
	icon: 'smart_button',
	component: InterfaceComponent,
	hideLabel: true,
	hideLoader: true,
	types: ['alias'],
	localTypes: ['presentation'],
	group: 'presentation',
	options: ({collection}) => [
		{
			field: 'icon',
			name: '$t:icon',
			type: 'string',
			meta: {
				width: 'half',
				interface: 'select-icon',
			},
		},
		{
			field: 'buttonType',
			name: '$t:type',
			type: 'string',
			meta: {
				width: 'half',
				interface: 'select-dropdown',
				default_value: 'normal',
				options: {
					choices: [
						{ text: '$t:primary', value: 'primary' },
						{ text: '$t:normal', value: 'normal' },
						{ text: '$t:info', value: 'info' },
						{ text: '$t:success', value: 'success' },
						{ text: '$t:warning', value: 'warning' },
						{ text: '$t:danger', value: 'danger' },
					],
				},
			},
			schema: {
				default_value: 'normal',
			},
		},
		{
			field: 'label',
			type: 'full',
			name: '$t:label',
			meta: {
				width: 'full',
				interface: 'system-display-template',
				options: {
					collectionName: collection,
					font: 'monospace',
					placeholder: '/items/collection/{{ id }}',
				},
			},
		},
		{
			field: 'method',
			name: 'Method',
			type: 'string',
			meta: {
				width: 'half',
				interface: 'select-dropdown',
				options: {
					choices: [
						{ text: 'GET', value: 'GET' },
						{ text: 'POST', value: 'POST' },
						{ text: 'PUT', value: 'PUT' },
						{ text: 'PATCH', value: 'PATCH' },
						{ text: 'DELETE', value: 'DELETE' },
					],
				},
			},
		},
		{
			field: 'url',
			type: 'string',
			name: '$t:url',
			meta: {
				width: 'full',
				interface: 'system-display-template',
				options: {
					collectionName: collection,
					font: 'monospace',
					placeholder: '/items/collection/{{ id }}',
				},
			},
		},
		{
			field: 'headers',
			type: 'json',
			name: 'Headers',
			meta: {
				width: 'full',
				interface: 'list',
				options: {
					template: '{{ key }}: {{ value }}',
					fields: [
						{
							field: 'key',
							type: 'string',
							name: '$t:name',
							meta: {
								interface: 'text',
								width: 'full',
								options: {
									font: 'monospace',
									placeholder: 'Header',
								},
							},
						},
						{
							field: 'value',
							type: 'string',
							name: '$t:value',
							meta: {
								width: 'full',
								interface: 'system-display-template',
								options: {
									collectionName: collection,
									font: 'monospace',
								},
							},
						},
					],
				},
			},
		},
		{
			field: 'body',
			type: 'text',
			name: 'Body',
			meta: {
				width: 'full',
				interface: 'input-code',
			},
		},
		{
			field: 'result',
			name: 'On success',
			type: 'string',
			meta: {
				width: 'full',
				interface: 'select-dropdown',
				default_value: 'popup',
				options: {
					choices: [
						{ text: 'Show popup', value: 'popup' },
						{ text: 'Go to list', value: 'list' },
					],
				},
			},
			schema: {
				default_value: 'popup',
			},
		},
	]
};
