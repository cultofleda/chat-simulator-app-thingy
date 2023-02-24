import * as React from 'react'

/**
 * @function createCtx
 * Shamelessly stolen from https://gist.github.com/sw-yx/f18fe6dd4c43fddb3a4971e80114a052#file-createctx-usereducer-tsx
 * @param reducer
 * @param initialState
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function createCtx<StateType, ActionType>(
  reducer: React.Reducer<StateType, ActionType>,
  initialState: StateType
) {
  const defaultDispatch: React.Dispatch<ActionType> = () => initialState

  const Context = React.createContext({
    state: initialState,
    dispatch: defaultDispatch,
  })

  function Provider(props: React.PropsWithChildren<Record<string, unknown>>) {
    const [state, dispatch] = React.useReducer<React.Reducer<StateType, ActionType>>(
      reducer,
      initialState
    )

    return <Context.Provider value={{ state, dispatch }} {...props} />
  }

  return [Context, Provider] as const
}
