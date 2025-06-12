import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  getPapers,
  getSubjects,
  getModules,
  getsSubModule,
} from '@/api/adminApi'

import AddNewModule from '@/components/AddNewModule'
import AddQuestion from '@/components/contentComponents/AddQuestion'
import FinalFolderComponent from '@/components/contentComponents/FinalFolderComponent'
import FolderComponent from '@/components/contentComponents/FolderComponent'
import ImportBtn from '@/components/contentComponents/importBtn'
import { DataTableDemo } from '@/components/DataTableDemo'

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

  const {
    data: papers,
    isLoading: isPapersLoading,
    isError: isPapersError,
    error: papersError,
  } = useQuery({
    queryKey: ['papers'],
    queryFn: getPapers
  })

  const {
    data: subjects,
    isLoading: isSubjectsLoading,
    isError: isSubjectsError,
    error: subjectsError,
  } = useQuery({
    queryKey: ['subjects', selectedPaper?._id],
    queryFn: () => {
      if (!selectedPaper?._id) return Promise.resolve([])
      return getSubjects(selectedPaper._id)
    },
    enabled: !!selectedPaper
  })

  const {
    data: modules,
    isLoading: isModulesLoading,
    isError: isModulesError,
    error: modulesError,
  } = useQuery({
    queryKey: ['modules', selectedSubject?._id],
    queryFn: () => {
      if (!selectedSubject?._id) return Promise.resolve([])
      return getModules(selectedSubject._id)
    },
    enabled: !!selectedSubject
  })

  const {
    data: submodules,
    isLoading: isSubmodulesLoading,
    isError: isSubmodulesError,
    error: submodulesError,
  } = useQuery({
    queryKey: ['submodules', selectedModule?._id],
    queryFn: () => {
      if (!selectedModule?._id) return Promise.resolve([])
      return getsSubModule(selectedModule._id)
    },
    enabled: !!selectedModule
  })

  const handlePaperClick = (paper) => {
    setSelectedPaper(paper)
    setSelectedSubject(null)
    setSelectedModule(null)
  }

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject)
    setSelectedModule(null)
  }

  const handleModuleClick = (module) => {
    setSelectedModule(module)
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
          onClick={() => handlePaperClick(paper)}
        />
      ))
    }

    if (isSubjectsLoading) return <div>Loading subjects...</div>
    if (isSubjectsError) return <div>Error loading subjects: {subjectsError.message}</div>

    if (!selectedSubject) {
      return subjects?.map(subject => (
        <FolderComponent
          key={subject._id}
          paperName={subject.name}
          onClick={() => handleSubjectClick(subject)}
        />
      ))
    }

    if (isModulesLoading) return <div>Loading modules...</div>
    if (isModulesError) return <div>Error loading modules: {modulesError.message}</div>

    if (!selectedModule) {
      return modules?.map(module => (
        <FolderComponent
          key={module._id}
          paperName={module.name}
          onClick={() => handleModuleClick(module)}
        />
      ))
    }

    if (isSubmodulesLoading) return <div>Loading submodules...</div>
    if (isSubmodulesError) return <div>Error loading submodules: {submodulesError.message}</div>

    return submodules?.map(sub => (
      <FolderComponent key={sub._id} paperName={sub.name} />
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
      {/* <DataTableDemo /> */}
    </div>
  )
}

export default ContentPage
