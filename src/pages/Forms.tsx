import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Forms() {
    return (
      <PageContainer title="Forms & Validação" subtitle="Form, TextFormField, validators e GlobalKey." difficulty="intermediario" timeToRead="10 min">
        <CodeBlock title="exemplo" code="final _formKey = GlobalKey<FormState>();\nfinal _email = TextEditingController();\n\nForm(\n  key: _formKey,\n  child: Column(\n    children: [\n      TextFormField(\n        controller: _email,\n        decoration: const InputDecoration(labelText: 'Email'),\n        validator: (v) {\n          if (v == null || !v.contains('@')) return 'Email inválido';\n          return null;\n        },\n      ),\n      ElevatedButton(\n        onPressed: () {\n          if (_formKey.currentState!.validate()) {\n            print('OK: ${_email.text}');\n          }\n        },\n        child: const Text('Enviar'),\n      ),\n    ],\n  ),\n)" />
      <AlertBox type="warning" title="Sempre dispose">Lembre de dar dispose nos TextEditingControllers no método dispose() do State.</AlertBox>
      </PageContainer>
    );
  }
  