import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  getPapers,
  getSubjects,
  getModules,
  getsSubModule,
} from '@/api/adminApi'

import FinalFolderComponent from '@/components/contentComponents/FinalFolderComponent'
import AddNewModule from '@/components/AddNewModule'
import AddQuestion from '@/components/contentComponents/AddQuestion'
import ImportBtn from '@/components/contentComponents/importBtn'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

const ContentPage = () => {
  const [selectedPaper, setSelectedPaper] = useState(null)
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [selectedModule, setSelectedModule] = useState(null)

  const { data: papers, isLoading: isPapersLoading, isError: isPapersError, error: papersError } = useQuery({
    queryKey: ['papers'],
    queryFn: getPapers
  })

  const { data: subjects, isLoading: isSubjectsLoading, isError: isSubjectsError, error: subjectsError } = useQuery({
    queryKey: ['subjects', selectedPaper?._id],
    queryFn: () => selectedPaper ? getSubjects(selectedPaper._id) : Promise.resolve([]),
    enabled: !!selectedPaper
  })

  const { data: modules, isLoading: isModulesLoading, isError: isModulesError, error: modulesError } = useQuery({
    queryKey: ['modules', selectedSubject?._id],
    queryFn: () => selectedSubject ? getModules(selectedSubject._id) : Promise.resolve([]),
    enabled: !!selectedSubject
  })

  const { data: submodules, isLoading: isSubmodulesLoading, isError: isSubmodulesError, error: submodulesError } = useQuery({
    queryKey: ['submodules', selectedModule?._id],
    queryFn: () => selectedModule ? getsSubModule(selectedModule._id) : Promise.resolve([]),
    enabled: !!selectedModule
  })

  const handleClick = (item, type) => {
    if (type === 'paper') {
      setSelectedPaper(item)
      setSelectedSubject(null)
      setSelectedModule(null)
    } else if (type === 'subject') {
      setSelectedSubject(item)
      setSelectedModule(null)
    } else if (type === 'module') {
      setSelectedModule(item)
    }
  }

  const renderBreadcrumb = () => (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            href="#"
            onClick={() => {
              setSelectedPaper(null)
              setSelectedSubject(null)
              setSelectedModule(null)
            }}
          >
            Papers
          </BreadcrumbLink>
        </BreadcrumbItem>

        {selectedPaper && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href="#"
                onClick={() => {
                  setSelectedSubject(null)
                  setSelectedModule(null)
                }}
              >
                {selectedPaper.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}

        {selectedSubject && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href="#"
                onClick={() => {
                  setSelectedModule(null)
                }}
              >
                {selectedSubject.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}

        {selectedModule && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">{selectedModule.name}</BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )

  const renderFolders = () => {
    if (isPapersLoading) return <div>Loading papers...</div>
    if (isPapersError) return <div>Error loading papers: {papersError.message}</div>

    if (!selectedPaper) {
      return papers?.map(paper => (
        <FinalFolderComponent
          key={paper._id}
          paper={paper}
          onClick={() => handleClick(paper, 'paper')}
          type="paper"
        />
      ))
    }

    if (isSubjectsLoading) return <div>Loading subjects...</div>
    if (isSubjectsError) return <div>Error loading subjects: {subjectsError.message}</div>

    if (!selectedSubject) {
      return subjects?.map(subject => (
        <FinalFolderComponent
          key={subject._id}
          paper={subject}
          onClick={() => handleClick(subject, 'subject')}
          type="subject"
          parentId={selectedPaper?._id}
        />
      ))
    }

    if (isModulesLoading) return <div>Loading modules...</div>
    if (isModulesError) return <div>Error loading modules: {modulesError.message}</div>

    if (!selectedModule) {
      return modules?.map(module => (
        <FinalFolderComponent
          key={module._id}
          paper={module}
          onClick={() => handleClick(module, 'module')}
          type="module"
          parentId={selectedSubject?._id}
        />
      ))
    }

    if (isSubmodulesLoading) return <div>Loading submodules...</div>
    if (isSubmodulesError) return <div>Error loading submodules: {submodulesError.message}</div>

    return submodules?.map(sub => (
      <FinalFolderComponent
        key={sub._id}
        paper={sub}
        type="submodule"
        parentId={selectedModule?._id}
      />
    ))
  }

  return (
    <div className='h-full w-full lg:p-10 p-5'>
      {renderBreadcrumb()}
      <div className="h-auto w-full flex flex-wrap gap-4 items-start">
        {renderFolders()}
        <AddNewModule
          selectedPaper={selectedPaper}
          selectedSubject={selectedSubject}
          selectedModule={selectedModule}
        />
      </div>
      <div className="h-auto mt-10 w-full flex justify-end items-end gap-2">
        <AddQuestion />
        <ImportBtn />
      </div>
    </div>
  )
}

export default ContentPage
