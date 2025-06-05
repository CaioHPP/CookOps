"use client";

import CompanyDataConfig from "@/components/CompanyDataConfig/CompanyDataConfig";
import OrdersConfig from "@/components/OrdersConfig/OrdersConfig";
import PaymentMethodsConfig from "@/components/PaymentMethodsConfig/PaymentMethodsConfig";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building2, ChevronRight, CreditCard, ShoppingBag } from "lucide-react";
import { useState } from "react";

const configuracaoItems = [
  {
    id: "formas-pagamento",
    title: "Formas de pagamento",
    description: "Configure as formas de pagamento aceitas",
    icon: CreditCard,
    color: "bg-blue-50 hover:bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: "pedidos",
    title: "Pedidos",
    description: "Configurações de pedidos e notificações",
    icon: ShoppingBag,
    color: "bg-green-50 hover:bg-green-100",
    iconColor: "text-green-600",
  },
  {
    id: "dados-empresa",
    title: "Dados da empresa",
    description: "Informações da empresa e horários",
    icon: Building2,
    color: "bg-purple-50 hover:bg-purple-100",
    iconColor: "text-purple-600",
  },
];

export default function Configuracoes() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleItemClick = (itemId: string) => {
    setSelectedItem(itemId);
    // TODO: Implementar navegação ou modal específico para cada seção
    console.log(`Configuração selecionada: ${itemId}`);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="fixed left-0 top-16 w-72 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 p-6 overflow-y-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {sessionStorage.getItem("nomeEmpresa") || "CookOps"}
            </h1>
            <p className="text-sm text-gray-600">Configurações do sistema</p>
          </div>

          <nav className="space-y-2">
            {configuracaoItems.map((item) => {
              const IconComponent = item.icon;
              const isSelected = selectedItem === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`
                    w-full flex items-center p-3 rounded-lg transition-all duration-200
                    ${
                      isSelected
                        ? "bg-blue-100 border-l-4 border-blue-500 text-blue-700"
                        : "hover:bg-gray-100 text-gray-700"
                    }
                  `}
                >
                  <IconComponent
                    className={`w-5 h-5 mr-3 ${
                      isSelected ? "text-blue-600" : "text-gray-500"
                    }`}
                  />
                  <span className="font-medium">{item.title}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-72 p-8">
          {!selectedItem ? (
            <div className="max-w-4xl">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Configurações
                </h2>
                <p className="text-gray-600">
                  Gerencie as configurações do seu restaurante
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {configuracaoItems.map((item) => {
                  const IconComponent = item.icon;

                  return (
                    <Card
                      key={item.id}
                      className={`
                        cursor-pointer transition-all duration-200 hover:shadow-lg border-2 hover:border-gray-300
                        ${item.color}
                      `}
                      onClick={() => handleItemClick(item.id)}
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <div className={`p-3 rounded-lg bg-white shadow-sm`}>
                            <IconComponent
                              className={`w-6 h-6 ${item.iconColor}`}
                            />
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                        <CardTitle className="text-lg font-semibold text-gray-900">
                          {item.title}
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-600">
                          {item.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="max-w-4xl">
              <div className="mb-8">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
                >
                  <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
                  Voltar às configurações
                </button>{" "}
                {selectedItem === "formas-pagamento" && (
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      Formas de pagamento
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Configure as formas de pagamento aceitas pelo seu
                      restaurante
                    </p>

                    <PaymentMethodsConfig />
                  </div>
                )}{" "}
                {selectedItem === "pedidos" && (
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      Configurações de Pedidos
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Configure como os pedidos são processados e as
                      notificações
                    </p>

                    <OrdersConfig />
                  </div>
                )}{" "}
                {selectedItem === "dados-empresa" && (
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      Dados da Empresa
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Informações básicas da empresa e horários de funcionamento
                    </p>

                    <CompanyDataConfig />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
