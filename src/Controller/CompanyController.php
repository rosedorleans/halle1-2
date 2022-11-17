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
     * @Route("/company/all", name="all_company")
     */
    public function showAll(CompanyRepository $companyRepository): Response
    {
        $data = [];
        foreach($companyRepository->findAll() as $company){
            $data[]=[
                "id" => $company->getId(),
                "name" => $company->getName(),
                "activity" => $company->getActivity(),
                "description" => $company->getDescription(),
                "room" => $company->getRoom(),
                "location" => $company->getLocation(),
                "hours" => $company->getHours(),
                "contact" => $company->getContact(),
                "photo" => $company->getPhoto(),
                "flower" => $company->getFlower(),
                "positionTop" => $company->getPositionTop(),
                "positionLeft" => $company->getPositionLeft()
            ];
        }
        return $this->json(['companies' => $data]);
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
                "room" => $company->getRoom(),
                "location" => $company->getLocation(),
                "hours" => $company->getHours(),
                "contact" => $company->getContact(),
                "flower" => $company->getFlower(),
                "positionTop" => $company->getPositionTop(),
                "positionLeft" => $company->getPositionLeft()
            ];
            // var_dump($data);
        }
        return $this->json(['company' => $data]);
    }
}
