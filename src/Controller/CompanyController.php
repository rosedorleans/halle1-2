<?php

namespace App\Controller;

use App\Entity\Company;
use App\Repository\CompanyRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CompanyController extends AbstractController
{
    /**
     * @Route("/company", name="company")
     */
    public function index(CompanyRepository $companyRepository): Response
    {
        $companies = $companyRepository->findAll();
        $count = count($companies);

        return $this->render('company/index.html.twig', [
            'companies' => $companies,
            'count' => $count,
        ]);
    }

    /**
     * @Route("company/{id}", name="company_show", methods={"GET"})
     */
    public function show(Company $company): Response
    {
        if($company){
            $data=[
                "id" => $company->getId(),
                "name" => $company->getName(),
                "activity" => $company->getActivity(),
                "description" => $company->getDescription(),
                "location" => $company->getLocation(),
                "contact" => $company->getContact(),
                "positionTop" => $company->getPositionTop(),
                "positionLeft" => $company->getPositionLeft()
            ];
            // var_dump($data);
        }
        return $this->json(['company' => $data]);
    }
}
