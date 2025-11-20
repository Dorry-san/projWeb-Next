"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { useEffect, useState } from "react";
//import Image from "next/image";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Card>
      <CardHeader className="text-4xl font-bold text-center">
        <CardTitle>Acceuil</CardTitle>
      </CardHeader>
      <CardContent>
        <Card>
          <CardHeader className="text-4xl font-bold text-center">
            <CardTitle>Bienvenue sur Archivea</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-center">
            Votre nouvel espace pour organiser, explorer et conserver vos médias
            et citations, directement sur votre appareil.
          </CardContent>
          <CardContent>
            Archivea combine la simplicité d’un explorateur de fichiers moderne
            avec des fonctionnalités avancées pour l’archivage local. Avec
            Archivea, vous pouvez :
            <ul>
              <li>
                Archiver vos médias et citations de façon sécurisée et locale,
                sans dépendre du cloud.
              </li>
              <li>
                Explorer vos fichiers facilement, grâce à une interface
                intuitive et agréable à utiliser.
              </li>
              <li>
                Prévisualiser vos contenus avant de les ouvrir, que ce soit des
                images, vidéos ou textes.
              </li>
            </ul>
          </CardContent>
          <CardContent>
            Archivea n’est pas seulement un gestionnaire de fichiers : c’est un
            espace pensé pour que vos souvenirs, inspirations et références
            soient toujours à portée de main, organisés et faciles à retrouver.
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
