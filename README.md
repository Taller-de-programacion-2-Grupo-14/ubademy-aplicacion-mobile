# App Mobile para TP de Taller de programación 2

## Instalación
En el directorio de la app:
1. yarn
2. expo start

## Troubleshooting

Para arreglar el error que les conté, tienen que agregar el parámetro "ref" a dos archivos:
- \node_modules\native-base\src\components\primitives\Hidden: (linea 6)
   ``` 
   const SkeletonCircle = ({ children, ...props }: ISkeletonProps, ref) => {
    const resolvedProps = usePropsResolution('SkeletonCircle', props);
    // Skeleton component with border Radius 999
    return resolvedProps.isLoaded ? children : <Skeleton {...resolvedProps} />;
  };
  ```
- \node_modules\native-base\src\components\composites\Skeleton: linea 8
  ```
  export function Hidden({ children, ...props }: IHiddenProps, ref) {
  const { from, till, only, platform, colorMode } = usePropsResolution(
    'Hidden',
    props,
    {
      ignoreProps: ['only', 'platform'],
    }
  );
  ```
