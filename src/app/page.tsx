"use client";

import { useState, useEffect } from "react";
import { Plus, Flame, TrendingUp, Apple, Utensils, Coffee, Moon, Search, Target, Award, User, ArrowRight, Activity, Droplet, Crown, Zap, Rocket, CreditCard, Smartphone, FileText, Check, X, Calendar, BarChart3, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Food {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  portion: string;
  category?: string;
}

interface MealEntry {
  id: string;
  food: Food;
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
  timestamp: Date;
}

interface UserProfile {
  age: number;
  sex: "male" | "female";
  weight: number;
  height: number;
  activityLevel: "sedentary" | "light" | "moderate" | "active" | "very-active";
  goal: "lose" | "maintain" | "gain";
  currentWaterIntake: number;
}

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  icon: any;
  color: string;
  features: string[];
  popular?: boolean;
}

const brazilianFoods: Food[] = [
  // Cereais e Grãos
  { id: "1", name: "Arroz Branco", calories: 130, protein: 2.7, carbs: 28, fat: 0.3, portion: "100g", category: "Cereais" },
  { id: "2", name: "Arroz Integral", calories: 111, protein: 2.6, carbs: 23, fat: 0.9, portion: "100g", category: "Cereais" },
  { id: "3", name: "Feijão Preto", calories: 77, protein: 4.5, carbs: 14, fat: 0.5, portion: "100g", category: "Leguminosas" },
  { id: "4", name: "Feijão Carioca", calories: 76, protein: 4.8, carbs: 13.6, fat: 0.5, portion: "100g", category: "Leguminosas" },
  { id: "5", name: "Lentilha", calories: 116, protein: 9, carbs: 20, fat: 0.4, portion: "100g", category: "Leguminosas" },
  { id: "6", name: "Grão de Bico", calories: 164, protein: 8.9, carbs: 27.4, fat: 2.6, portion: "100g", category: "Leguminosas" },
  { id: "7", name: "Macarrão", calories: 131, protein: 5, carbs: 25, fat: 1.1, portion: "100g", category: "Cereais" },
  { id: "8", name: "Macarrão Integral", calories: 124, protein: 5.3, carbs: 26, fat: 1.4, portion: "100g", category: "Cereais" },
  { id: "9", name: "Quinoa", calories: 120, protein: 4.4, carbs: 21.3, fat: 1.9, portion: "100g", category: "Cereais" },
  { id: "10", name: "Aveia", calories: 389, protein: 16.9, carbs: 66.3, fat: 6.9, portion: "100g", category: "Cereais" },
  
  // Pães e Massas
  { id: "11", name: "Pão Francês", calories: 300, protein: 9, carbs: 58, fat: 3.5, portion: "100g", category: "Pães" },
  { id: "12", name: "Pão Integral", calories: 247, protein: 9, carbs: 49, fat: 3.5, portion: "100g", category: "Pães" },
  { id: "13", name: "Pão de Forma", calories: 269, protein: 8.9, carbs: 50, fat: 3.3, portion: "100g", category: "Pães" },
  { id: "14", name: "Pão de Queijo", calories: 207, protein: 5.5, carbs: 23, fat: 10, portion: "50g", category: "Pães" },
  { id: "15", name: "Tapioca", calories: 98, protein: 0.2, carbs: 25, fat: 0.1, portion: "1 unidade", category: "Pães" },
  { id: "16", name: "Biscoito de Polvilho", calories: 387, protein: 0.5, carbs: 91, fat: 1.5, portion: "100g", category: "Pães" },
  
  // Carnes e Proteínas
  { id: "17", name: "Frango Grelhado", calories: 165, protein: 31, carbs: 0, fat: 3.6, portion: "100g", category: "Carnes" },
  { id: "18", name: "Peito de Frango", calories: 195, protein: 29.6, carbs: 0, fat: 7.8, portion: "100g", category: "Carnes" },
  { id: "19", name: "Coxa de Frango", calories: 211, protein: 25.9, carbs: 0, fat: 11.2, portion: "100g", category: "Carnes" },
  { id: "20", name: "Bife Acebolado", calories: 220, protein: 26, carbs: 5, fat: 10, portion: "150g", category: "Carnes" },
  { id: "21", name: "Picanha", calories: 258, protein: 18, carbs: 0, fat: 20, portion: "100g", category: "Carnes" },
  { id: "22", name: "Filé Mignon", calories: 179, protein: 20.7, carbs: 0, fat: 10.2, portion: "100g", category: "Carnes" },
  { id: "23", name: "Carne Moída", calories: 209, protein: 26.1, carbs: 0, fat: 11, portion: "100g", category: "Carnes" },
  { id: "24", name: "Costela Bovina", calories: 360, protein: 16, carbs: 0, fat: 32, portion: "100g", category: "Carnes" },
  { id: "25", name: "Linguiça Toscana", calories: 296, protein: 16, carbs: 2, fat: 25, portion: "100g", category: "Carnes" },
  { id: "26", name: "Bacon", calories: 541, protein: 37, carbs: 1.4, fat: 42, portion: "100g", category: "Carnes" },
  { id: "27", name: "Presunto", calories: 145, protein: 21, carbs: 1.5, fat: 6, portion: "100g", category: "Carnes" },
  { id: "28", name: "Salsicha", calories: 315, protein: 12, carbs: 3, fat: 29, portion: "100g", category: "Carnes" },
  
  // Peixes e Frutos do Mar
  { id: "29", name: "Salmão", calories: 208, protein: 20, carbs: 0, fat: 13, portion: "100g", category: "Peixes" },
  { id: "30", name: "Tilápia", calories: 96, protein: 20.1, carbs: 0, fat: 1.7, portion: "100g", category: "Peixes" },
  { id: "31", name: "Atum em Lata", calories: 116, protein: 26, carbs: 0, fat: 0.8, portion: "100g", category: "Peixes" },
  { id: "32", name: "Sardinha", calories: 208, protein: 24.6, carbs: 0, fat: 11.5, portion: "100g", category: "Peixes" },
  { id: "33", name: "Camarão", calories: 99, protein: 24, carbs: 0.2, fat: 0.3, portion: "100g", category: "Peixes" },
  { id: "34", name: "Bacalhau", calories: 290, protein: 25, carbs: 0, fat: 21, portion: "100g", category: "Peixes" },
  
  // Ovos e Laticínios
  { id: "35", name: "Ovo Cozido", calories: 155, protein: 13, carbs: 1.1, fat: 11, portion: "1 unidade", category: "Ovos" },
  { id: "36", name: "Ovo Frito", calories: 196, protein: 13.6, carbs: 0.8, fat: 15, portion: "1 unidade", category: "Ovos" },
  { id: "37", name: "Omelete", calories: 154, protein: 10.6, carbs: 1.2, fat: 11.7, portion: "100g", category: "Ovos" },
  { id: "38", name: "Leite Integral", calories: 61, protein: 3.2, carbs: 4.8, fat: 3.3, portion: "100ml", category: "Laticínios" },
  { id: "39", name: "Leite Desnatado", calories: 34, protein: 3.4, carbs: 4.9, fat: 0.1, portion: "100ml", category: "Laticínios" },
  { id: "40", name: "Iogurte Natural", calories: 61, protein: 3.5, carbs: 4.7, fat: 3.3, portion: "100g", category: "Laticínios" },
  { id: "41", name: "Iogurte Grego", calories: 97, protein: 9, carbs: 3.6, fat: 5, portion: "100g", category: "Laticínios" },
  { id: "42", name: "Queijo Minas", calories: 264, protein: 17.4, carbs: 3, fat: 20.8, portion: "100g", category: "Laticínios" },
  { id: "43", name: "Queijo Mussarela", calories: 280, protein: 18.9, carbs: 3.1, fat: 22.4, portion: "100g", category: "Laticínios" },
  { id: "44", name: "Queijo Prato", calories: 360, protein: 25, carbs: 1.5, fat: 28, portion: "100g", category: "Laticínios" },
  { id: "45", name: "Requeijão", calories: 264, protein: 8.5, carbs: 3, fat: 25, portion: "100g", category: "Laticínios" },
  
  // Frutas
  { id: "46", name: "Banana", calories: 89, protein: 1.1, carbs: 23, fat: 0.3, portion: "1 unidade", category: "Frutas" },
  { id: "47", name: "Maçã", calories: 52, protein: 0.3, carbs: 14, fat: 0.2, portion: "1 unidade", category: "Frutas" },
  { id: "48", name: "Laranja", calories: 47, protein: 0.9, carbs: 12, fat: 0.1, portion: "1 unidade", category: "Frutas" },
  { id: "49", name: "Mamão", calories: 43, protein: 0.5, carbs: 11, fat: 0.3, portion: "100g", category: "Frutas" },
  { id: "50", name: "Abacaxi", calories: 50, protein: 0.5, carbs: 13, fat: 0.1, portion: "100g", category: "Frutas" },
  { id: "51", name: "Melancia", calories: 30, protein: 0.6, carbs: 8, fat: 0.2, portion: "100g", category: "Frutas" },
  { id: "52", name: "Morango", calories: 32, protein: 0.7, carbs: 7.7, fat: 0.3, portion: "100g", category: "Frutas" },
  { id: "53", name: "Uva", calories: 69, protein: 0.7, carbs: 18, fat: 0.2, portion: "100g", category: "Frutas" },
  { id: "54", name: "Manga", calories: 60, protein: 0.8, carbs: 15, fat: 0.4, portion: "100g", category: "Frutas" },
  { id: "55", name: "Abacate", calories: 160, protein: 2, carbs: 8.5, fat: 14.7, portion: "100g", category: "Frutas" },
  { id: "56", name: "Açaí", calories: 58, protein: 0.8, carbs: 6.2, fat: 3.5, portion: "100g", category: "Frutas" },
  { id: "57", name: "Goiaba", calories: 68, protein: 2.6, carbs: 14.3, fat: 1, portion: "100g", category: "Frutas" },
  
  // Vegetais e Verduras
  { id: "58", name: "Salada Verde", calories: 25, protein: 2, carbs: 5, fat: 0.3, portion: "100g", category: "Vegetais" },
  { id: "59", name: "Alface", calories: 15, protein: 1.4, carbs: 2.9, fat: 0.2, portion: "100g", category: "Vegetais" },
  { id: "60", name: "Tomate", calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, portion: "100g", category: "Vegetais" },
  { id: "61", name: "Cenoura", calories: 41, protein: 0.9, carbs: 10, fat: 0.2, portion: "100g", category: "Vegetais" },
  { id: "62", name: "Brócolis", calories: 34, protein: 2.8, carbs: 7, fat: 0.4, portion: "100g", category: "Vegetais" },
  { id: "63", name: "Couve", calories: 49, protein: 4.3, carbs: 10, fat: 0.9, portion: "100g", category: "Vegetais" },
  { id: "64", name: "Espinafre", calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, portion: "100g", category: "Vegetais" },
  { id: "65", name: "Abobrinha", calories: 17, protein: 1.2, carbs: 3.1, fat: 0.3, portion: "100g", category: "Vegetais" },
  { id: "66", name: "Berinjela", calories: 25, protein: 1, carbs: 6, fat: 0.2, portion: "100g", category: "Vegetais" },
  { id: "67", name: "Chuchu", calories: 19, protein: 0.8, carbs: 4.5, fat: 0.1, portion: "100g", category: "Vegetais" },
  { id: "68", name: "Batata Inglesa", calories: 77, protein: 2, carbs: 17, fat: 0.1, portion: "100g", category: "Vegetais" },
  { id: "69", name: "Batata Doce", calories: 86, protein: 1.6, carbs: 20, fat: 0.1, portion: "100g", category: "Vegetais" },
  { id: "70", name: "Mandioca", calories: 160, protein: 1.4, carbs: 38, fat: 0.3, portion: "100g", category: "Vegetais" },
  
  // Pratos Típicos Brasileiros
  { id: "71", name: "Feijoada", calories: 280, protein: 18, carbs: 12, fat: 18, portion: "100g", category: "Pratos Típicos" },
  { id: "72", name: "Moqueca", calories: 150, protein: 15, carbs: 8, fat: 7, portion: "100g", category: "Pratos Típicos" },
  { id: "73", name: "Acarajé", calories: 350, protein: 8, carbs: 35, fat: 20, portion: "1 unidade", category: "Pratos Típicos" },
  { id: "74", name: "Vatapá", calories: 180, protein: 6, carbs: 15, fat: 11, portion: "100g", category: "Pratos Típicos" },
  { id: "75", name: "Baião de Dois", calories: 140, protein: 6, carbs: 22, fat: 3, portion: "100g", category: "Pratos Típicos" },
  { id: "76", name: "Escondidinho", calories: 200, protein: 12, carbs: 18, fat: 10, portion: "100g", category: "Pratos Típicos" },
  { id: "77", name: "Strogonoff", calories: 250, protein: 15, carbs: 12, fat: 16, portion: "100g", category: "Pratos Típicos" },
  
  // Salgados e Lanches
  { id: "78", name: "Coxinha", calories: 250, protein: 8, carbs: 25, fat: 12, portion: "1 unidade", category: "Salgados" },
  { id: "79", name: "Pastel", calories: 300, protein: 7, carbs: 30, fat: 16, portion: "1 unidade", category: "Salgados" },
  { id: "80", name: "Empada", calories: 220, protein: 6, carbs: 20, fat: 13, portion: "1 unidade", category: "Salgados" },
  { id: "81", name: "Esfirra", calories: 180, protein: 8, carbs: 22, fat: 7, portion: "1 unidade", category: "Salgados" },
  { id: "82", name: "Kibe", calories: 240, protein: 12, carbs: 18, fat: 13, portion: "1 unidade", category: "Salgados" },
  { id: "83", name: "Risoles", calories: 210, protein: 7, carbs: 20, fat: 11, portion: "1 unidade", category: "Salgados" },
  { id: "84", name: "Enroladinho", calories: 190, protein: 6, carbs: 18, fat: 10, portion: "1 unidade", category: "Salgados" },
  
  // Doces e Sobremesas
  { id: "85", name: "Brigadeiro", calories: 115, protein: 1.5, carbs: 15, fat: 5.5, portion: "1 unidade", category: "Doces" },
  { id: "86", name: "Beijinho", calories: 110, protein: 1.2, carbs: 14, fat: 5.2, portion: "1 unidade", category: "Doces" },
  { id: "87", name: "Pudim", calories: 180, protein: 4, carbs: 28, fat: 6, portion: "100g", category: "Doces" },
  { id: "88", name: "Quindim", calories: 250, protein: 5, carbs: 35, fat: 10, portion: "1 unidade", category: "Doces" },
  { id: "89", name: "Cocada", calories: 200, protein: 2, carbs: 30, fat: 8, portion: "1 unidade", category: "Doces" },
  { id: "90", name: "Paçoca", calories: 488, protein: 15, carbs: 50, fat: 25, portion: "100g", category: "Doces" },
  { id: "91", name: "Pé de Moleque", calories: 450, protein: 10, carbs: 60, fat: 20, portion: "100g", category: "Doces" },
  { id: "92", name: "Bolo de Chocolate", calories: 350, protein: 5, carbs: 50, fat: 15, portion: "100g", category: "Doces" },
  { id: "93", name: "Bolo de Cenoura", calories: 320, protein: 4, carbs: 45, fat: 14, portion: "100g", category: "Doces" },
  
  // Bebidas
  { id: "94", name: "Café com Leite", calories: 60, protein: 3, carbs: 8, fat: 2, portion: "200ml", category: "Bebidas" },
  { id: "95", name: "Café Preto", calories: 2, protein: 0.3, carbs: 0, fat: 0, portion: "100ml", category: "Bebidas" },
  { id: "96", name: "Suco de Laranja", calories: 45, protein: 0.7, carbs: 10, fat: 0.2, portion: "100ml", category: "Bebidas" },
  { id: "97", name: "Vitamina de Banana", calories: 150, protein: 5, carbs: 28, fat: 2.5, portion: "200ml", category: "Bebidas" },
  { id: "98", name: "Água de Coco", calories: 19, protein: 0.7, carbs: 3.7, fat: 0.2, portion: "100ml", category: "Bebidas" },
  { id: "99", name: "Chimarrão", calories: 5, protein: 0.5, carbs: 1, fat: 0, portion: "200ml", category: "Bebidas" },
  
  // Oleaginosas e Sementes
  { id: "100", name: "Castanha do Pará", calories: 656, protein: 14, carbs: 12, fat: 66, portion: "100g", category: "Oleaginosas" },
  { id: "101", name: "Amendoim", calories: 567, protein: 26, carbs: 16, fat: 49, portion: "100g", category: "Oleaginosas" },
  { id: "102", name: "Castanha de Caju", calories: 553, protein: 18, carbs: 30, fat: 44, portion: "100g", category: "Oleaginosas" },
  { id: "103", name: "Amêndoas", calories: 579, protein: 21, carbs: 22, fat: 50, portion: "100g", category: "Oleaginosas" },
  { id: "104", name: "Nozes", calories: 654, protein: 15, carbs: 14, fat: 65, portion: "100g", category: "Oleaginosas" },
  { id: "105", name: "Chia", calories: 486, protein: 17, carbs: 42, fat: 31, portion: "100g", category: "Sementes" },
  { id: "106", name: "Linhaça", calories: 534, protein: 18, carbs: 29, fat: 42, portion: "100g", category: "Sementes" },
];

const pricingPlans: PricingPlan[] = [
  {
    id: "basic",
    name: "Básico",
    price: 29.90,
    period: "mês",
    icon: Apple,
    color: "from-emerald-500 to-teal-600",
    features: [
      "Contador de calorias ilimitado",
      "Banco de alimentos brasileiros",
      "Metas personalizadas",
      "Acompanhamento de macros",
      "Controle de hidratação"
    ]
  },
  {
    id: "premium",
    name: "Premium",
    price: 49.90,
    period: "mês",
    icon: Zap,
    color: "from-purple-500 to-pink-600",
    popular: true,
    features: [
      "Tudo do plano Básico",
      "Planos de refeições personalizados",
      "Receitas saudáveis exclusivas",
      "Suporte prioritário",
      "Relatórios semanais detalhados",
      "Integração com wearables"
    ]
  },
  {
    id: "pro",
    name: "Pro",
    price: 79.90,
    period: "mês",
    icon: Rocket,
    color: "from-orange-500 to-red-600",
    features: [
      "Tudo do plano Premium",
      "Consultoria nutricional online",
      "Planos de treino personalizados",
      "Acompanhamento com nutricionista",
      "Análise de composição corporal",
      "Acesso vitalício a conteúdos",
      "Comunidade exclusiva VIP"
    ]
  }
];

export default function CalorieCounter() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [quizStep, setQuizStep] = useState(0);
  const [quizData, setQuizData] = useState<Partial<UserProfile>>({});
  const [meals, setMeals] = useState<MealEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState<"breakfast" | "lunch" | "dinner" | "snack">("breakfast");
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "credit" | "boleto">("pix");
  const [cardData, setCardData] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [waterIntake, setWaterIntake] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Carregar dados do localStorage
  useEffect(() => {
    const loadLocalData = () => {
      try {
        // Carregar perfil
        const savedProfile = localStorage.getItem("nutriapp_profile");
        if (savedProfile) {
          setUserProfile(JSON.parse(savedProfile));
        }

        // Carregar refeições do dia
        const today = new Date().toISOString().split('T')[0];
        const savedMeals = localStorage.getItem(`nutriapp_meals_${today}`);
        if (savedMeals) {
          const parsedMeals = JSON.parse(savedMeals);
          setMeals(parsedMeals.map((meal: any) => ({
            ...meal,
            timestamp: new Date(meal.timestamp)
          })));
        }

        // Carregar água do dia
        const savedWater = localStorage.getItem(`nutriapp_water_${today}`);
        if (savedWater) {
          setWaterIntake(parseFloat(savedWater));
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLocalData();
  }, []);

  // Salvar refeições no localStorage
  useEffect(() => {
    if (meals.length > 0) {
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem(`nutriapp_meals_${today}`, JSON.stringify(meals));
    }
  }, [meals]);

  // Salvar água no localStorage
  useEffect(() => {
    if (waterIntake > 0) {
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem(`nutriapp_water_${today}`, waterIntake.toString());
    }
  }, [waterIntake]);

  const calculateTMB = (profile: UserProfile) => {
    const tmb = profile.sex === "male"
      ? 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5
      : 10 * profile.weight + 6.25 * profile.height - 5 * profile.age - 161;

    const activityMultipliers = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, "very-active": 1.9 };
    let tdee = tmb * activityMultipliers[profile.activityLevel];

    if (profile.goal === "lose") tdee -= 500;
    else if (profile.goal === "gain") tdee += 300;

    return Math.round(tdee);
  };

  const calculateWaterGoal = (weight: number) => Math.round((weight * 35) / 1000 * 10) / 10;

  const calculateMacros = (calories: number, profile: UserProfile) => {
    let proteinPct = 0.3;
    let carbsPct = 0.4;
    let fatPct = 0.3;
    
    if (profile.goal === "gain") { 
      proteinPct = 0.35; 
      carbsPct = 0.45; 
      fatPct = 0.2; 
    } else if (profile.goal === "lose") { 
      proteinPct = 0.35; 
      carbsPct = 0.35; 
      fatPct = 0.3; 
    }
    
    return {
      protein: Math.round((calories * proteinPct) / 4),
      carbs: Math.round((calories * carbsPct) / 4),
      fat: Math.round((calories * fatPct) / 9),
    };
  };

  const dailyGoal = userProfile ? calculateTMB(userProfile) : 2000;
  const macros = userProfile ? calculateMacros(dailyGoal, userProfile) : { protein: 150, carbs: 250, fat: 67 };
  const waterGoal = userProfile ? calculateWaterGoal(userProfile.weight) : 2.5;

  const totals = meals.reduce((acc, entry) => ({
    calories: acc.calories + entry.food.calories,
    protein: acc.protein + entry.food.protein,
    carbs: acc.carbs + entry.food.carbs,
    fat: acc.fat + entry.food.fat,
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

  const remaining = dailyGoal - totals.calories;
  const progressPercentage = (totals.calories / dailyGoal) * 100;

  const addFood = (food: Food, mealType: "breakfast" | "lunch" | "dinner" | "snack") => {
    const newMeal: MealEntry = {
      id: `${Date.now()}_${Math.random()}`,
      food,
      mealType,
      timestamp: new Date()
    };

    setMeals([...meals, newMeal]);
    setIsDialogOpen(false);
    setSearchTerm("");
    setSelectedCategory("all");
    toast.success(`${food.name} adicionado com sucesso!`);
  };

  const addWater = (amount: number) => {
    setWaterIntake(waterIntake + amount);
    toast.success(`${amount}L de água adicionado!`);
  };

  const categories = ["all", ...Array.from(new Set(brazilianFoods.map(f => f.category).filter(Boolean)))];
  
  const filteredFoods = brazilianFoods.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getMealIcon = (type: string) => {
    const icons = { breakfast: Coffee, lunch: Utensils, dinner: Moon, snack: Apple };
    const Icon = icons[type as keyof typeof icons] || Utensils;
    return <Icon className="w-5 h-5" />;
  };

  const getMealLabel = (type: string) => {
    const labels = { breakfast: "Café da Manhã", lunch: "Almoço", dinner: "Jantar", snack: "Lanche" };
    return labels[type as keyof typeof labels] || type;
  };

  const getMealsByType = (type: "breakfast" | "lunch" | "dinner" | "snack") => meals.filter((meal) => meal.mealType === type);
  const getMealCalories = (type: "breakfast" | "lunch" | "dinner" | "snack") => getMealsByType(type).reduce((sum, meal) => sum + meal.food.calories, 0);

  const handleQuizNext = () => {
    if (quizStep < 6) {
      setQuizStep(quizStep + 1);
    } else {
      const profile = quizData as UserProfile;
      setUserProfile(profile);
      localStorage.setItem("nutriapp_profile", JSON.stringify(profile));
      toast.success('Perfil salvo com sucesso!');
    }
  };

  const handleSelectPlan = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setIsPricingOpen(false);
    setIsPaymentOpen(true);
  };

  const handleConfirmPayment = () => {
    setIsPaymentOpen(false);
    setIsSuccessOpen(true);
    setTimeout(() => {
      setIsSuccessOpen(false);
      setSelectedPlan(null);
      setPaymentMethod("pix");
      setCardData({ number: "", name: "", expiry: "", cvv: "" });
    }, 3000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-4 rounded-2xl inline-block mb-4 animate-pulse">
            <Apple className="w-12 h-12 text-white" />
          </div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-4 rounded-2xl inline-block mb-4">
              <User className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Bem-vindo ao NutriApp!</h1>
            <p className="text-gray-600">Vamos configurar seu perfil para calcular suas metas personalizadas</p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Passo {quizStep + 1} de 7</span>
              <span>{Math.round(((quizStep + 1) / 7) * 100)}%</span>
            </div>
            <Progress value={((quizStep + 1) / 7) * 100} className="h-2" />
          </div>

          <div className="space-y-6">
            {quizStep === 0 && (
              <div className="space-y-4">
                <Label className="text-lg font-semibold">Qual é o seu sexo?</Label>
                <RadioGroup value={quizData.sex} onValueChange={(value) => setQuizData({ ...quizData, sex: value as "male" | "female" })} className="space-y-3">
                  <div className="flex items-center space-x-3 p-4 border-2 rounded-lg hover:bg-emerald-50 cursor-pointer transition-colors">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male" className="cursor-pointer flex-1 font-medium">Masculino</Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border-2 rounded-lg hover:bg-emerald-50 cursor-pointer transition-colors">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female" className="cursor-pointer flex-1 font-medium">Feminino</Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {quizStep === 1 && (
              <div className="space-y-4">
                <Label htmlFor="age" className="text-lg font-semibold">Qual é a sua idade?</Label>
                <Input id="age" type="number" placeholder="Ex: 25" value={quizData.age || ""} onChange={(e) => setQuizData({ ...quizData, age: parseInt(e.target.value) })} className="text-lg p-6" />
                <p className="text-sm text-gray-600">Digite sua idade em anos</p>
              </div>
            )}

            {quizStep === 2 && (
              <div className="space-y-4">
                <Label htmlFor="weight" className="text-lg font-semibold">Qual é o seu peso?</Label>
                <div className="relative">
                  <Input id="weight" type="number" step="0.1" placeholder="Ex: 70.5" value={quizData.weight || ""} onChange={(e) => setQuizData({ ...quizData, weight: parseFloat(e.target.value) })} className="text-lg p-6 pr-12" />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">kg</span>
                </div>
                <p className="text-sm text-gray-600">Digite seu peso em quilogramas</p>
              </div>
            )}

            {quizStep === 3 && (
              <div className="space-y-4">
                <Label htmlFor="height" className="text-lg font-semibold">Qual é a sua altura?</Label>
                <div className="relative">
                  <Input id="height" type="number" placeholder="Ex: 175" value={quizData.height || ""} onChange={(e) => setQuizData({ ...quizData, height: parseInt(e.target.value) })} className="text-lg p-6 pr-12" />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">cm</span>
                </div>
                <p className="text-sm text-gray-600">Digite sua altura em centímetros</p>
              </div>
            )}

            {quizStep === 4 && (
              <div className="space-y-4">
                <Label className="text-lg font-semibold">Qual é o seu nível de atividade física?</Label>
                <RadioGroup value={quizData.activityLevel} onValueChange={(value) => setQuizData({ ...quizData, activityLevel: value as UserProfile["activityLevel"] })} className="space-y-3">
                  {[
                    { value: "sedentary", label: "Sedentário", desc: "Pouco ou nenhum exercício" },
                    { value: "light", label: "Levemente ativo", desc: "Exercício leve 1-3 dias/semana" },
                    { value: "moderate", label: "Moderadamente ativo", desc: "Exercício moderado 3-5 dias/semana" },
                    { value: "active", label: "Muito ativo", desc: "Exercício intenso 6-7 dias/semana" },
                    { value: "very-active", label: "Extremamente ativo", desc: "Exercício muito intenso, trabalho físico" }
                  ].map(({ value, label, desc }) => (
                    <div key={value} className="flex items-center space-x-3 p-4 border-2 rounded-lg hover:bg-emerald-50 cursor-pointer transition-colors">
                      <RadioGroupItem value={value} id={value} />
                      <Label htmlFor={value} className="cursor-pointer flex-1">
                        <div className="font-medium">{label}</div>
                        <div className="text-sm text-gray-600">{desc}</div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {quizStep === 5 && (
              <div className="space-y-4">
                <Label className="text-lg font-semibold">Qual é o seu objetivo?</Label>
                <RadioGroup value={quizData.goal} onValueChange={(value) => setQuizData({ ...quizData, goal: value as UserProfile["goal"] })} className="space-y-3">
                  {[
                    { value: "lose", label: "Perder peso", desc: "Déficit calórico de 500 kcal/dia" },
                    { value: "maintain", label: "Manter peso", desc: "Manter calorias de manutenção" },
                    { value: "gain", label: "Ganhar massa muscular", desc: "Superávit calórico de 300 kcal/dia" }
                  ].map(({ value, label, desc }) => (
                    <div key={value} className="flex items-center space-x-3 p-4 border-2 rounded-lg hover:bg-emerald-50 cursor-pointer transition-colors">
                      <RadioGroupItem value={value} id={value} />
                      <Label htmlFor={value} className="cursor-pointer flex-1">
                        <div className="font-medium">{label}</div>
                        <div className="text-sm text-gray-600">{desc}</div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {quizStep === 6 && (
              <div className="space-y-4">
                <Label htmlFor="waterIntake" className="text-lg font-semibold">Quantos litros de água você bebe por dia?</Label>
                <div className="relative">
                  <Input id="waterIntake" type="number" step="0.1" placeholder="Ex: 2.0" value={quizData.currentWaterIntake || ""} onChange={(e) => setQuizData({ ...quizData, currentWaterIntake: parseFloat(e.target.value) })} className="text-lg p-6 pr-16" />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">litros</span>
                </div>
                <p className="text-sm text-gray-600">Digite a quantidade média de água que você consome diariamente</p>
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-8">
            {quizStep > 0 && <Button variant="outline" onClick={() => setQuizStep(quizStep - 1)} className="flex-1">Voltar</Button>}
            <Button
              onClick={handleQuizNext}
              disabled={
                (quizStep === 0 && !quizData.sex) ||
                (quizStep === 1 && !quizData.age) ||
                (quizStep === 2 && !quizData.weight) ||
                (quizStep === 3 && !quizData.height) ||
                (quizStep === 4 && !quizData.activityLevel) ||
                (quizStep === 5 && !quizData.goal) ||
                (quizStep === 6 && !quizData.currentWaterIntake)
              }
              className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
            >
              {quizStep === 6 ? "Finalizar" : "Próximo"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-xl">
                <Apple className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">NutriApp</h1>
                <p className="text-sm text-gray-600">Seu contador de calorias</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsHistoryOpen(true)}
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                <History className="w-4 h-4 mr-1" />
                Histórico
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsPricingOpen(true)}
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
              >
                <Crown className="w-4 h-4 mr-1" />
                Planos
              </Button>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-semibold text-gray-700">Dia 7</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <Card className="p-4 bg-gradient-to-r from-teal-50 to-emerald-50 border-emerald-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <Activity className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Seu Perfil</p>
                <p className="font-semibold text-gray-900">
                  {userProfile.sex === "male" ? "Homem" : "Mulher"}, {userProfile.age} anos, {userProfile.weight}kg, {userProfile.height}cm
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setUserProfile(null)} className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100">
              Editar
            </Button>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <Droplet className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-blue-100 text-sm font-medium">Hidratação Hoje</p>
                <h3 className="text-3xl font-bold">{waterIntake.toFixed(1)}L / {waterGoal}L</h3>
              </div>
            </div>
            <div className="text-right">
              {waterIntake < waterGoal ? (
                <div className="bg-yellow-400/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                  <p className="text-sm font-medium">Faltam</p>
                  <p className="text-2xl font-bold">+{(waterGoal - waterIntake).toFixed(1)}L</p>
                </div>
              ) : (
                <div className="bg-green-400/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                  <p className="text-sm font-medium">✓ Meta atingida!</p>
                  <p className="text-lg font-bold">Parabéns!</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => addWater(0.25)} variant="secondary" size="sm" className="flex-1">+250ml</Button>
            <Button onClick={() => addWater(0.5)} variant="secondary" size="sm" className="flex-1">+500ml</Button>
            <Button onClick={() => addWater(1)} variant="secondary" size="sm" className="flex-1">+1L</Button>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm font-medium">Meta Diária Personalizada</p>
                <h2 className="text-4xl font-bold">{dailyGoal} kcal</h2>
              </div>
              <div className="text-right">
                <p className="text-emerald-100 text-sm font-medium">Restante</p>
                <h2 className={`text-4xl font-bold ${remaining < 0 ? 'text-red-200' : ''}`}>{remaining > 0 ? remaining : 0} kcal</h2>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-emerald-100">Consumido: {totals.calories} kcal</span>
                <span className="text-emerald-100">{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-3 bg-emerald-300/30" />
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-emerald-400/30">
              <div className="text-center">
                <p className="text-emerald-100 text-xs mb-1">Proteína</p>
                <p className="text-xl font-bold">{Math.round(totals.protein)}g</p>
                <p className="text-emerald-200 text-xs">de {macros.protein}g</p>
              </div>
              <div className="text-center">
                <p className="text-emerald-100 text-xs mb-1">Carboidratos</p>
                <p className="text-xl font-bold">{Math.round(totals.carbs)}g</p>
                <p className="text-emerald-200 text-xs">de {macros.carbs}g</p>
              </div>
              <div className="text-center">
                <p className="text-emerald-100 text-xs mb-1">Gordura</p>
                <p className="text-xl font-bold">{Math.round(totals.fat)}g</p>
                <p className="text-emerald-200 text-xs">de {macros.fat}g</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              Suas Refeições
            </h3>
          </div>

          {(["breakfast", "lunch", "dinner", "snack"] as const).map((mealType) => (
            <Card key={mealType} className="p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 p-2 rounded-lg">{getMealIcon(mealType)}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{getMealLabel(mealType)}</h4>
                    <p className="text-sm text-gray-600">{getMealCalories(mealType)} kcal</p>
                  </div>
                </div>
                <Dialog open={isDialogOpen && selectedMealType === mealType} onOpenChange={(open) => {
                  setIsDialogOpen(open);
                  if (open) setSelectedMealType(mealType);
                  if (!open) {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }
                }}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700" onClick={() => setSelectedMealType(mealType)}>
                      <Plus className="w-4 h-4 mr-1" />
                      Adicionar
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-xl">Adicionar alimento - {getMealLabel(mealType)}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input placeholder="Buscar alimentos brasileiros..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                          <Button
                            key={cat}
                            size="sm"
                            variant={selectedCategory === cat ? "default" : "outline"}
                            onClick={() => setSelectedCategory(cat)}
                            className={selectedCategory === cat ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                          >
                            {cat === "all" ? "Todos" : cat}
                          </Button>
                        ))}
                      </div>

                      <div className="text-sm text-gray-600 bg-emerald-50 p-3 rounded-lg">
                        <p className="font-semibold text-emerald-800">
                          {filteredFoods.length} alimentos encontrados
                        </p>
                      </div>
                      
                      <div className="space-y-2 max-h-[400px] overflow-y-auto">
                        {filteredFoods.map((food) => (
                          <div key={food.id} className="p-4 border rounded-lg hover:bg-emerald-50 cursor-pointer transition-colors" onClick={() => addFood(food, mealType)}>
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h5 className="font-semibold text-gray-900">{food.name}</h5>
                                  {food.category && (
                                    <Badge variant="secondary" className="text-xs">
                                      {food.category}
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{food.portion}</p>
                                <div className="flex gap-4 text-xs text-gray-600">
                                  <span className="font-medium">P: {food.protein}g</span>
                                  <span className="font-medium">C: {food.carbs}g</span>
                                  <span className="font-medium">G: {food.fat}g</span>
                                </div>
                              </div>
                              <div className="text-right ml-4">
                                <p className="text-2xl font-bold text-emerald-600">{food.calories}</p>
                                <p className="text-xs text-gray-600">kcal</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {getMealsByType(mealType).length > 0 ? (
                <div className="space-y-2 pt-2 border-t">
                  {getMealsByType(mealType).map((entry) => (
                    <div key={entry.id} className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{entry.food.name}</p>
                        <p className="text-xs text-gray-600">{entry.food.portion}</p>
                      </div>
                      <p className="font-semibold text-emerald-600">{entry.food.calories} kcal</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-4 border-t">Nenhum alimento adicionado</p>
              )}
            </Card>
          ))}
        </div>

        <Card className="p-6 bg-gradient-to-br from-teal-50 to-emerald-50">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-600" />
            Resumo do Dia
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white rounded-lg">
              <p className="text-2xl font-bold text-emerald-600">{meals.length}</p>
              <p className="text-xs text-gray-600">Alimentos</p>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <p className="text-2xl font-bold text-emerald-600">{totals.calories}</p>
              <p className="text-xs text-gray-600">Calorias</p>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <p className="text-2xl font-bold text-emerald-600">{Math.round(totals.protein)}</p>
              <p className="text-xs text-gray-600">Proteína (g)</p>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <p className="text-2xl font-bold text-emerald-600">{Math.round(totals.carbs)}</p>
              <p className="text-xs text-gray-600">Carboidratos (g)</p>
            </div>
          </div>
        </Card>
      </main>

      {/* Modal de Histórico */}
      <Dialog open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <History className="w-6 h-6 text-blue-600" />
              Histórico de Refeições
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <p className="text-gray-600 text-center py-8">
              Funcionalidade de histórico em desenvolvimento. Em breve você poderá visualizar suas refeições dos últimos dias!
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Planos */}
      <Dialog open={isPricingOpen} onOpenChange={setIsPricingOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-center mb-2">
              Escolha seu Plano
            </DialogTitle>
          </DialogHeader>
          <p className="text-center text-gray-600 mb-6">
            Potencialize seus resultados com recursos exclusivos
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {pricingPlans.map((plan) => {
              const Icon = plan.icon;
              return (
                <Card 
                  key={plan.id} 
                  className={`relative p-6 hover:shadow-2xl transition-all duration-300 ${
                    plan.popular ? 'border-2 border-purple-500 shadow-xl scale-105' : ''
                  }`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-1">
                      Mais Popular
                    </Badge>
                  )}
                  
                  <div className="text-center mb-6">
                    <div className={`bg-gradient-to-br ${plan.color} p-4 rounded-2xl inline-block mb-4`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-gray-900">R$ {plan.price.toFixed(2)}</span>
                      <span className="text-gray-600">/{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className={`bg-gradient-to-br ${plan.color} p-1 rounded-full mt-0.5`}>
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    onClick={() => handleSelectPlan(plan)}
                    className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 text-white font-semibold py-6 text-lg`}
                  >
                    Assinar {plan.name}
                  </Button>
                </Card>
              );
            })}
          </div>

          <div className="mt-8 p-4 bg-emerald-50 rounded-lg text-center">
            <p className="text-sm text-gray-700">
              💳 Todos os planos incluem <strong>7 dias de teste grátis</strong> e podem ser cancelados a qualquer momento
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Pagamento */}
      <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center mb-2">
              Finalizar Assinatura
            </DialogTitle>
          </DialogHeader>
          {selectedPlan && (
            <div className="text-center">
              <p className="text-gray-600">Plano {selectedPlan.name}</p>
              <p className="text-3xl font-bold text-emerald-600 mt-2">
                R$ {selectedPlan.price.toFixed(2)}/{selectedPlan.period}
              </p>
            </div>
          )}

          <div className="space-y-6 mt-6">
            <div>
              <Label className="text-lg font-semibold mb-4 block">Escolha a forma de pagamento</Label>
              <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as "pix" | "credit" | "boleto")} className="space-y-3">
                <div className="flex items-center space-x-3 p-4 border-2 rounded-lg hover:bg-emerald-50 cursor-pointer transition-colors">
                  <RadioGroupItem value="pix" id="pix" />
                  <Label htmlFor="pix" className="cursor-pointer flex-1 flex items-center gap-3">
                    <Smartphone className="w-6 h-6 text-emerald-600" />
                    <div>
                      <div className="font-semibold">PIX</div>
                      <div className="text-sm text-gray-600">Aprovação instantânea</div>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-4 border-2 rounded-lg hover:bg-emerald-50 cursor-pointer transition-colors">
                  <RadioGroupItem value="credit" id="credit" />
                  <Label htmlFor="credit" className="cursor-pointer flex-1 flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                    <div>
                      <div className="font-semibold">Cartão de Crédito</div>
                      <div className="text-sm text-gray-600">Parcelamento disponível</div>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-4 border-2 rounded-lg hover:bg-emerald-50 cursor-pointer transition-colors">
                  <RadioGroupItem value="boleto" id="boleto" />
                  <Label htmlFor="boleto" className="cursor-pointer flex-1 flex items-center gap-3">
                    <FileText className="w-6 h-6 text-orange-600" />
                    <div>
                      <div className="font-semibold">Boleto Bancário</div>
                      <div className="text-sm text-gray-600">Vencimento em 3 dias úteis</div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {paymentMethod === "pix" && (
              <Card className="p-6 bg-emerald-50 border-emerald-200">
                <div className="text-center space-y-4">
                  <div className="bg-white p-4 rounded-lg inline-block">
                    <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500 text-sm">QR Code PIX</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    Escaneie o QR Code com o app do seu banco ou copie o código PIX abaixo
                  </p>
                  <div className="bg-white p-3 rounded-lg border-2 border-dashed border-emerald-300">
                    <p className="text-xs font-mono break-all text-gray-600">
                      00020126580014br.gov.bcb.pix0136a1b2c3d4-e5f6-7890-abcd-ef1234567890
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {paymentMethod === "credit" && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Número do Cartão</Label>
                  <Input 
                    id="cardNumber" 
                    placeholder="0000 0000 0000 0000" 
                    value={cardData.number}
                    onChange={(e) => setCardData({...cardData, number: e.target.value})}
                    maxLength={19}
                  />
                </div>
                <div>
                  <Label htmlFor="cardName">Nome no Cartão</Label>
                  <Input 
                    id="cardName" 
                    placeholder="NOME COMPLETO" 
                    value={cardData.name}
                    onChange={(e) => setCardData({...cardData, name: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cardExpiry">Validade</Label>
                    <Input 
                      id="cardExpiry" 
                      placeholder="MM/AA" 
                      value={cardData.expiry}
                      onChange={(e) => setCardData({...cardData, expiry: e.target.value})}
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardCvv">CVV</Label>
                    <Input 
                      id="cardCvv" 
                      placeholder="123" 
                      type="password"
                      value={cardData.cvv}
                      onChange={(e) => setCardData({...cardData, cvv: e.target.value})}
                      maxLength={4}
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "boleto" && (
              <Card className="p-6 bg-orange-50 border-orange-200">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FileText className="w-6 h-6 text-orange-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Instruções do Boleto</h4>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• O boleto será gerado após a confirmação</li>
                        <li>• Vencimento em 3 dias úteis</li>
                        <li>• Após o pagamento, a liberação ocorre em até 2 dias úteis</li>
                        <li>• Você receberá o boleto por email</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            <div className="flex gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsPaymentOpen(false);
                  setIsPricingOpen(true);
                }}
                className="flex-1"
              >
                Voltar
              </Button>
              <Button 
                onClick={handleConfirmPayment}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-6"
              >
                {paymentMethod === "pix" ? "Confirmar Pagamento PIX" : 
                 paymentMethod === "credit" ? "Finalizar Compra" : 
                 "Gerar Boleto"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Sucesso */}
      <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Compra Realizada com Sucesso!
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-6 py-6">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-full inline-block">
              <Check className="w-16 h-16 text-white" />
            </div>
            <div>
              <p className="text-gray-600">
                Bem-vindo ao plano <strong>{selectedPlan?.name}</strong>!
              </p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                Você receberá um email de confirmação com todos os detalhes da sua assinatura.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
