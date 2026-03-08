import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  referenceSidebar: [
    {
      type: 'html',
      value: '<span class="sidebar-shell-title">Overview</span>',
      defaultStyle: false,
      className: 'sidebar-shell-heading',
    },
    {
      type: 'category',
      label: 'API Reference',
      link: {type: 'doc', id: 'api-reference/index'},
      collapsible: false,
      className: 'sidebar-shell-group',
      items: [
        {
          type: 'category',
          label: 'Hooks',
          collapsible: true,
          collapsed: false,
          items: [
            {
              type: 'doc',
              id: 'api-reference/use-action-state',
              label: 'useActionState',
              customProps: {badge: 'New', badgeTone: 'new'},
            },
            {type: 'doc', id: 'api-reference/use-callback', label: 'useCallback'},
            {type: 'doc', id: 'api-reference/use-context', label: 'useContext'},
            {
              type: 'doc',
              id: 'api-reference/use-debug-value',
              label: 'useDebugValue',
              customProps: {badge: 'New', badgeTone: 'subtle'},
            },
            {
              type: 'doc',
              id: 'api-reference/use-deferred-value',
              label: 'useDeferredValue',
            },
            {
              type: 'doc',
              id: 'api-reference/use-effect',
              label: 'useEffect',
              customProps: {badge: 'Deprecated', badgeTone: 'muted'},
            },
            {type: 'doc', id: 'api-reference/use-id', label: 'useId'},
            {
              type: 'doc',
              id: 'api-reference/use-imperative-handle',
              label: 'useImperativeHandle',
              customProps: {badge: 'New', badgeTone: 'subtle'},
            },
            {type: 'doc', id: 'api-reference/use-optimistic', label: 'useOptimistic'},
          ],
        },
        {
          type: 'category',
          label: 'States',
          collapsible: true,
          collapsed: true,
          items: ['state-patterns'],
        },
        {
          type: 'category',
          label: 'Callbacks',
          collapsible: true,
          collapsed: true,
          items: ['callback-patterns'],
        },
        {
          type: 'category',
          label: 'Tutorial Extras',
          collapsible: true,
          collapsed: true,
          items: ['tutorial-extras/translate-your-site'],
        },
      ],
    },
  ],
};

export default sidebars;
