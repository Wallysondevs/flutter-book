import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function AnimacoesExplicitas() {
    return (
      <PageContainer title="Animações Explícitas" subtitle="AnimationController + Tween — controle total do timeline." difficulty="avancado" timeToRead="12 min">
        <CodeBlock title="exemplo" code="class _MyState extends State<My> with SingleTickerProviderStateMixin {\n  late final _ctrl = AnimationController(\n    vsync: this,\n    duration: const Duration(seconds: 1),\n  )..repeat(reverse: true);\n\n  @override\n  void dispose() { _ctrl.dispose(); super.dispose(); }\n\n  @override\n  Widget build(BuildContext c) {\n    return AnimatedBuilder(\n      animation: _ctrl,\n      builder: (c, _) => Transform.scale(\n        scale: 1 + _ctrl.value,\n        child: const FlutterLogo(size: 80),\n      ),\n    );\n  }\n}" />
      <AlertBox type="warning" title="Não esqueça vsync e dispose">Sem vsync, o controller não anima. Sem dispose, memory leak.</AlertBox>
      </PageContainer>
    );
  }
  